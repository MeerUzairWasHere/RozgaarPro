import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const defaultSkills: Array<{ name: string; profession: string }> = [
  { name: "Plumbing", profession: "Plumber" },
  { name: "Electrical", profession: "Electrician" },
  { name: "Carpentry", profession: "Carpenter" },
  { name: "Painting", profession: "Painter" },
  { name: "Cleaning", profession: "Cleaner" },
  { name: "Gardening", profession: "Gardener" },
  { name: "Masonry", profession: "Mason" },
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
