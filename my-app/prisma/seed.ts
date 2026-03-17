import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const traits = [
  'Creative', 'Analytical', 'Detail-oriented', 'Leadership', 'Teamwork',
  'Problem-solving', 'Communication', 'Adaptability', 'Time management',
  'Critical thinking', 'Patience', 'Curiosity', 'Reliability', 'Initiative',
  'Flexibility', 'Motivation', 'Organization', 'Precision', 'Interpersonal',
  'Logical thinking', 'Empathy', 'Confidence', 'Planning', 'Innovation',
  'Collaboration', 'Research skills', 'Attention to detail', 'Persistence',
  'Quick learner', 'Multitasking', 'Listening', 'Honesty', 'Responsibility',
  'Diplomacy', 'Strategic thinking', 'Mentoring', 'Consistency', 'Ambition',
  'Networking', 'Negotiation', 'Conflict resolution', 'Presentation', 'Teaching',
  'Debugging mindset', 'Creativity in problem-solving', 'User empathy', 'Data literacy',
  'Systems thinking', 'Cultural awareness', 'Ethical thinking'
];

const studies = [
  { name: 'Software Engineering', description: 'Build applications and systems' },
  { name: 'Psychology', description: 'Study human behavior and mind' },
  { name: 'Business Administration', description: 'Manage organizations effectively' },
  { name: 'Graphic Design', description: 'Create visual content and branding' },
  { name: 'Data Science', description: 'Analyze and interpret data' },
  { name: 'Civil Engineering', description: 'Design and build infrastructure' },
  { name: 'Marketing', description: 'Promote products and services' },
  { name: 'Nursing', description: 'Provide healthcare and patient care' },
  { name: 'Architecture', description: 'Design buildings and spaces' },
  { name: 'Mechanical Engineering', description: 'Design mechanical systems' },
  { name: 'Environmental Science', description: 'Study and protect the environment' },
  { name: 'Finance', description: 'Manage money and investments' },
  { name: 'Education', description: 'Teach and develop curriculum' },
  { name: 'Law', description: 'Study legal systems and practice law' },
  { name: 'Medicine', description: 'Diagnose and treat diseases' },
  { name: 'Accounting', description: 'Manage financial records' },
  { name: 'Human Resources', description: 'Manage people and organizations' },
  { name: 'Biotechnology', description: 'Use biology for technological innovation' },
  { name: 'Cybersecurity', description: 'Protect digital systems' },
  { name: 'UX/UI Design', description: 'Design user experiences' },
  { name: 'Project Management', description: 'Lead and coordinate projects' },
  { name: 'Electrical Engineering', description: 'Work with electrical systems' },
  { name: 'Philosophy', description: 'Explore fundamental concepts and ethics' },
  { name: 'Public Relations', description: 'Manage organizational communication' },
  { name: 'Social Work', description: 'Help and support communities' }
];

async function main() {
  for (const trait of traits) {
    await prisma.characterTrait.create({ data: { name: trait } });
  }

  for (const study of studies) {
    await prisma.study.create({ data: study });
  }

  console.log('Database seeded!');
}

main().catch(console.error).finally(() => prisma.$disconnect());