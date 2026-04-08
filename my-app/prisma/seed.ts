import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.characterTraitToStudy.deleteMany();
  await prisma.study.deleteMany();
  await prisma.characterTrait.deleteMany();

  // Create 40+ character traits (all unique names)
  const traits = await Promise.all([
    prisma.characterTrait.create({ data: { name: 'Analytical' } }),
    prisma.characterTrait.create({ data: { name: 'Creative' } }),
    prisma.characterTrait.create({ data: { name: 'Problem-solver' } }),
    prisma.characterTrait.create({ data: { name: 'Detail-oriented' } }),
    prisma.characterTrait.create({ data: { name: 'Innovative' } }),
    prisma.characterTrait.create({ data: { name: 'Patient' } }),
    prisma.characterTrait.create({ data: { name: 'Leadership' } }),
    prisma.characterTrait.create({ data: { name: 'Communication' } }),
    prisma.characterTrait.create({ data: { name: 'Collaborative' } }),
    prisma.characterTrait.create({ data: { name: 'Independent' } }),
    prisma.characterTrait.create({ data: { name: 'Curious' } }),
    prisma.characterTrait.create({ data: { name: 'Logical' } }),
    prisma.characterTrait.create({ data: { name: 'Artistic' } }),
    prisma.characterTrait.create({ data: { name: 'Practical' } }),
    prisma.characterTrait.create({ data: { name: 'Visionary' } }),
    prisma.characterTrait.create({ data: { name: 'Methodical' } }),
    prisma.characterTrait.create({ data: { name: 'Flexible' } }),
    prisma.characterTrait.create({ data: { name: 'Perfectionistic' } }),
    prisma.characterTrait.create({ data: { name: 'Empathetic' } }),
    prisma.characterTrait.create({ data: { name: 'Ambitious' } }),
    prisma.characterTrait.create({ data: { name: 'Organized' } }),
    prisma.characterTrait.create({ data: { name: 'Risk-taker' } }),
    prisma.characterTrait.create({ data: { name: 'Strategic' } }),
    prisma.characterTrait.create({ data: { name: 'Hands-on' } }),
    prisma.characterTrait.create({ data: { name: 'Research-minded' } }),
    prisma.characterTrait.create({ data: { name: 'Social' } }),
    prisma.characterTrait.create({ data: { name: 'Introverted' } }),
    prisma.characterTrait.create({ data: { name: 'Adaptable' } }),
    prisma.characterTrait.create({ data: { name: 'Competitive' } }),
    prisma.characterTrait.create({ data: { name: 'Compassionate' } }),
    prisma.characterTrait.create({ data: { name: 'Technical' } }),
    prisma.characterTrait.create({ data: { name: 'Mathematical' } }),
    prisma.characterTrait.create({ data: { name: 'Visual' } }),
    prisma.characterTrait.create({ data: { name: 'Linguistic' } }),
    prisma.characterTrait.create({ data: { name: 'Musical' } }),
    prisma.characterTrait.create({ data: { name: 'Diligent' } }),
    prisma.characterTrait.create({ data: { name: 'Outgoing' } }),
    prisma.characterTrait.create({ data: { name: 'Ethical' } }),
    prisma.characterTrait.create({ data: { name: 'Reflective' } }),
    prisma.characterTrait.create({ data: { name: 'Disciplined' } }),
  ]);

  // Create IT-related studies with unique trait combinations
  const studies = [
    {
      name: 'Computer Science',
      description: 'Study of computation, algorithms, and software development',
      traitIndices: [0, 11, 3, 14, 22, 30, 32, 39],
    },
    {
      name: 'Web Development',
      description: 'Build responsive and interactive web applications',
      traitIndices: [1, 31, 13, 33, 8, 4, 36, 27],
    },
    {
      name: 'Cybersecurity',
      description: 'Protect systems and data from digital attacks',
      traitIndices: [0, 37, 3, 11, 21, 39, 30, 29],
    },
    {
      name: 'Data Science',
      description: 'Analyze and extract insights from large datasets',
      traitIndices: [0, 32, 11, 10, 2, 14, 25, 39],
    },
    {
      name: 'Cloud Computing',
      description: 'Design and manage cloud infrastructure and services',
      traitIndices: [0, 22, 20, 30, 15, 6, 8, 28],
    },
    {
      name: 'Artificial Intelligence',
      description: 'Develop intelligent systems and machine learning models',
      traitIndices: [0, 11, 4, 14, 32, 10, 25, 39],
    },
    {
      name: 'IT Project Management',
      description: 'Manage technical teams and IT projects',
      traitIndices: [6, 20, 22, 8, 7, 29, 36, 2],
    },
    {
      name: 'Mobile App Development',
      description: 'Create applications for mobile platforms',
      traitIndices: [1, 31, 4, 33, 13, 24, 27, 39],
    },
    {
      name: 'Database Administration',
      description: 'Manage and optimize database systems',
      traitIndices: [0, 15, 20, 3, 30, 31, 11, 37],
    },
    {
      name: 'Network Engineering',
      description: 'Design and maintain computer networks',
      traitIndices: [0, 30, 3, 15, 20, 31, 11, 38],
    },
  ];

  // Create studies and their trait relationships
  for (const study of studies) {
    const createdStudy = await prisma.study.create({
      data: {
        name: study.name,
        description: study.description,
      },
    });

    // Link traits to study
    for (const traitIndex of study.traitIndices) {
      await prisma.characterTraitToStudy.create({
        data: {
          charactertraitId: traits[traitIndex].id,
          studyId: createdStudy.id,
        },
      });
    }
  }

  console.log('✅ Seed completed! Created 40 traits and 10 IT-related studies with unique trait combinations.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });