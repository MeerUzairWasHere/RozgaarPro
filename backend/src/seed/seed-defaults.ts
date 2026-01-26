import { PrismaClient } from "@prisma/client";
import { prismaService } from "../container";

const prisma = new PrismaClient();

/**
 * Profession → Skills mapping
 */
const professionSkills = [
  {
    name: "Plumber",
    skills: ["Pipe Fitting", "Leak Repair", "Bathroom Installation"],
  },
  {
    name: "Electrician",
    skills: ["Wiring", "Switch Installation", "Appliance Repair"],
  },
  {
    name: "Carpenter",
    skills: ["Furniture Making", "Door Fitting", "Wood Repair"],
  },
  {
    name: "Painter",
    skills: ["Wall Painting", "Texture Paint", "Waterproof Coating"],
  },
  {
    name: "Cleaner",
    skills: ["House Cleaning", "Office Cleaning", "Deep Cleaning"],
  },
  {
    name: "Gardener",
    skills: ["Lawn Maintenance", "Plant Care", "Tree Trimming"],
  },
  {
    name: "Mason",
    skills: ["Brick Work", "Plastering", "Concrete Work"],
  },
];

async function main() {
  const professionCount = await prismaService.profession.count();

  if (professionCount === 0) {
    console.log("🌱 Seeding professions & skills...");

    for (const profession of professionSkills) {
      // 1️⃣ Create or fetch profession
      const createdProfession = await prisma.profession.upsert({
        where: { name: profession.name },
        update: {},
        create: {
          name: profession.name,
        },
      });

      // 2️⃣ Create skills under that profession
      for (const skillName of profession.skills) {
        await prisma.skill.upsert({
          where: {
            name_professionId: {
              name: skillName,
              professionId: createdProfession.id,
            },
          },
          update: {},
          create: {
            name: skillName,
            professionId: createdProfession.id,
          },
        });
      }
    }
    console.log("✅ Seeding completed successfully");
  }
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
