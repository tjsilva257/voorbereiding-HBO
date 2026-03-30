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
  { name: 'Software Engineering', description: 'Develop and build software applications and systems' },
  { name: 'UI/UX Design', description: 'Create beautiful and intuitive user interfaces' },
  { name: 'Data Science', description: 'Analyze data and build predictive models' },
  { name: 'Business Management', description: 'Lead teams and manage business operations' },
  { name: 'Marketing', description: 'Create campaigns and drive business growth' },
  { name: 'Project Management', description: 'Plan and execute complex projects' },
  { name: 'DevOps Engineering', description: 'Manage infrastructure and deployment systems' },
  { name: 'Product Management', description: 'Shape product strategy and development' }
];

async function main() {
  for (const trait of traits) {
    await prisma.characterTrait.create({ data: { name: trait } });
  }

  for (const study of studies) {
    await prisma.study.create({ data: study });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });