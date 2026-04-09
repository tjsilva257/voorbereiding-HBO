import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const traits = [
  'Creative',
  'Analytical',
  'Leadership',
  'Communication',
  'Problem Solving',
  'Team Player',
  'Detail Oriented',
  'Adaptable',
  'Innovative',
  'Organized'
];

const studies = [
  { 
    name: 'Software Engineering', 
    description: 'Develop and build software applications and systems',
    relatedTraits: ['Analytical', 'Problem Solving', 'Detail Oriented']
  },
  { 
    name: 'UI/UX Design', 
    description: 'Create beautiful and intuitive user interfaces',
    relatedTraits: ['Creative', 'Communication', 'Detail Oriented']
  },
  { 
    name: 'Data Science', 
    description: 'Analyze data and build predictive models',
    relatedTraits: ['Analytical', 'Problem Solving', 'Innovative']
  },
  { 
    name: 'Business Management', 
    description: 'Lead teams and manage business operations',
    relatedTraits: ['Leadership', 'Communication', 'Organized']
  },
  { 
    name: 'Marketing', 
    description: 'Create campaigns and drive business growth',
    relatedTraits: ['Creative', 'Communication', 'Team Player']
  },
  { 
    name: 'Project Management', 
    description: 'Plan and execute complex projects',
    relatedTraits: ['Leadership', 'Organized', 'Communication']
  },
  { 
    name: 'DevOps Engineering', 
    description: 'Manage infrastructure and deployment systems',
    relatedTraits: ['Problem Solving', 'Detail Oriented', 'Adaptable']
  },
  { 
    name: 'Product Management', 
    description: 'Shape product strategy and development',
    relatedTraits: ['Leadership', 'Innovative', 'Communication']
  },
  { 
    name: 'Data Engineering', 
    description: 'Build and maintain data infrastructure systems',
    relatedTraits: ['Analytical', 'Problem Solving', 'Detail Oriented']
  },
  { 
    name: 'Cloud Architecture', 
    description: 'Design scalable cloud solutions',
    relatedTraits: ['Innovative', 'Problem Solving', 'Organized']
  }
];

async function main() {
  // Clear existing data
  await prisma.charactertraittostudy.deleteMany({});
  await prisma.charactertrait.deleteMany({});
  await prisma.study.deleteMany({});

  // Create traits
  const createdTraits: Record<string, { id: number }> = {};
  for (const trait of traits) {
    const created = await prisma.charactertrait.create({ 
      data: { name: trait } 
    });
    createdTraits[trait] = created;
  }

  // Create studies and link to traits
  for (const study of studies) {
    const created = await prisma.study.create({ 
      data: { name: study.name, description: study.description } 
    });

    // Link traits to study
    for (const traitName of study.relatedTraits) {
      const trait = createdTraits[traitName];
      if (trait) {
        await prisma.charactertraittostudy.create({
          data: {
            charactertraitId: trait.id,
            studyId: created.id
          }
        });
      }
    }
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });