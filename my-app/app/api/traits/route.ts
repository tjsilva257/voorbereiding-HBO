export async function GET() {
  const traits = [
    "Creative",
    "Analytical",
    "Leadership",
    "Communication",
    "Problem Solving",
    "Team Player",
    "Detail Oriented",
    "Adaptable",
    "Innovative",
    "Organized"
  ];

  return Response.json({ traits });
}