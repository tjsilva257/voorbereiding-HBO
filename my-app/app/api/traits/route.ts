import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const traits = await prisma.characterTrait.findMany({
      select: {
        name: true,
      },
    });

    const traitNames = traits.map(t => t.name);

    return Response.json({ traits: traitNames });
  } catch (error) {
    console.error('Error fetching traits:', error);
    return Response.json(
      { traits: [], error: 'Failed to fetch traits from database' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}