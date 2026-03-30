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
    
    const traits = traitsParam ? traitsParam.split(',') : [];

    // Fetch all studies from database
    const studies = await prisma.study.findMany({
      include: {
        traits: {
          select: {
            name: true,
          },
        },
      },
    });

    const matches: CareerMatch[] = studies
      .map(study => {
        const matchCount = study.traits.filter((t: { name: string }) => 
          traits.includes(t.name)
        ).length;
        const matchScore = study.traits.length > 0 
          ? Math.round((matchCount / study.traits.length) * 100)
          : 0;
        
        return {
          study: study.name,
          description: study.description,
          matchScore,
        };
      })
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
