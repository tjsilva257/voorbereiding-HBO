import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CareerMatch {
  study: string;
  description: string | null;
  matchScore: number;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const traitsParam = searchParams.get('traits');
    
    const traits = traitsParam ? traitsParam.split(',').map(t => t.trim()) : [];

    if (traits.length === 0) {
      return Response.json({ matches: [] });
    }

    // Fetch all studies with their related traits
    const studies = await prisma.study.findMany({
      include: {
        traits: {
          include: {
            charactertrait: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const matches: CareerMatch[] = studies
      .map(study => {
        const studyTraitNames = study.traits.map((t: any) => t.charactertrait.name);
        
        // Count how many selected traits match this study's traits
        const matchCount = traits.filter(selectedTrait =>
          studyTraitNames.some(studyTrait =>
            studyTrait.toLowerCase() === selectedTrait.toLowerCase()
          )
        ).length;

        // Calculate match score: (matching traits / selected traits) * 100
        const matchScore = traits.length > 0
          ? Math.round((matchCount / traits.length) * 100)
          : 0;

        return {
          study: study.name,
          description: study.description,
          matchScore,
        };
      })
      .filter(m => m.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);

    return Response.json({ matches });
  } catch (error) {
    console.error('Error fetching studies:', error);
    return Response.json(
      { error: 'Failed to fetch studies', matches: [] },
      { status: 500 }
    );
  }
}
