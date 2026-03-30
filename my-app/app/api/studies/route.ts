export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const traitsParam = searchParams.get('traits');
  
  const traits = traitsParam ? traitsParam.split(',') : [];

  const allStudies: Record<string, any> = {
    'Software Engineering': {
      description: 'Develop and build software applications and systems',
      relatedTraits: ['Analytical', 'Problem Solving', 'Detail Oriented']
    },
    'UI/UX Design': {
      description: 'Create beautiful and intuitive user interfaces',
      relatedTraits: ['Creative', 'Communication', 'Detail Oriented']
    },
    'Data Science': {
      description: 'Analyze data and build predictive models',
      relatedTraits: ['Analytical', 'Problem Solving', 'Innovative']
    },
    'Business Management': {
      description: 'Lead teams and manage business operations',
      relatedTraits: ['Leadership', 'Communication', 'Organized']
    },
    'Marketing': {
      description: 'Create campaigns and drive business growth',
      relatedTraits: ['Creative', 'Communication', 'Team Player']
    },
    'Project Management': {
      description: 'Plan and execute complex projects',
      relatedTraits: ['Leadership', 'Organized', 'Communication']
    },
    'DevOps Engineering': {
      description: 'Manage infrastructure and deployment systems',
      relatedTraits: ['Problem Solving', 'Detail Oriented', 'Adaptable']
    },
    'Product Management': {
      description: 'Shape product strategy and development',
      relatedTraits: ['Leadership', 'Innovative', 'Communication']
    },
    'Data Engineering': {
      description: 'Build and maintain data infrastructure systems',
      relatedTraits: ['Analytical', 'Problem Solving', 'Detail Oriented']
    },
    'Cloud Architecture': {
      description: 'Design scalable cloud solutions',
      relatedTraits: ['Innovative', 'Problem Solving', 'Organized']
    }
  };

  const matches = Object.entries(allStudies)
    .map(([study, data]) => {
      const matchCount = data.relatedTraits.filter((t: string) => 
        traits.includes(t)
      ).length;
      const matchScore = Math.round((matchCount / data.relatedTraits.length) * 100);
      return { study, description: data.description, matchScore };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  return Response.json({ matches });
}
