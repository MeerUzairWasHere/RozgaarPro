import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const defaultSkills = [
  { name: "Plumbing" },
  { name: "Electrical" },
  { name: "Carpentry" },
  { name: "Painting" },
  { name: "Cleaning" },
  { name: "Gardening" },
  { name: "Masonry" },
];

async function main() {
  const skillCount = await prisma.skill.count();

  if (skillCount === 0) {
    await prisma.skill.createMany({
      data: defaultSkills,
      skipDuplicates: true,
    });
  }
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
