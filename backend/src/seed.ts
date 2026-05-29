import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";

const demoUser = {
  email: "demo@checkit.com",
  alias: "GamerDemo",
  password: "demo123",
};

const sampleGames = [
  {
    name: "The Legend of Zelda: Breath of the Wild",
    category: "RPG",
    tags: JSON.stringify(["acción", "aventura", "mundo abierto"]),
    metacriticScore: 97,
    hoursToBeat: 50,
  },
  {
    name: "Portal 2",
    category: "Puzzle",
    tags: JSON.stringify(["puzzles", "humor", "ciencia ficción"]),
    metacriticScore: 95,
    hoursToBeat: 8,
  },
  {
    name: "Hades",
    category: "Roguelike",
    tags: JSON.stringify(["acción", "mitología", "roguelike"]),
    metacriticScore: 93,
    hoursToBeat: 22,
  },
  {
    name: "Celeste",
    category: "Plataformas",
    tags: JSON.stringify(["plataformas", "difícil", "historia conmovedora"]),
    metacriticScore: 92,
    hoursToBeat: 8,
  },
  {
    name: "Stardew Valley",
    category: "Simulación",
    tags: JSON.stringify(["granja", "relajante", "indie"]),
    metacriticScore: 89,
    hoursToBeat: 52,
  },
  {
    name: "Vampire Survivors",
    category: "Roguelike",
    tags: JSON.stringify(["acción", "indie", "adictivo"]),
    metacriticScore: 86,
    hoursToBeat: 5,
  },
  {
    name: "Cyberpunk 2077",
    category: "RPG",
    tags: JSON.stringify(["acción", "mundo abierto", "cyberpunk"]),
    metacriticScore: 86,
    hoursToBeat: 60,
  },
  {
    name: "Firewatch",
    category: "Aventura",
    tags: JSON.stringify(["aventura", "narrativo", "indie"]),
    metacriticScore: 81,
    hoursToBeat: 4,
  },
];

async function seed() {
  console.log("Seeding database...");

  await prisma.game.deleteMany();
  await prisma.user.deleteMany();
  console.log("Cleared existing data");

  const hashedPassword = await bcrypt.hash(demoUser.password, 10);

  const user = await prisma.user.create({
    data: {
      email: demoUser.email,
      alias: demoUser.alias,
      password: hashedPassword,
    },
  });
  console.log(`Created demo user: ${demoUser.email} / ${demoUser.password}`);

  for (const game of sampleGames) {
    await prisma.game.create({
      data: { ...game, userId: user.id },
    });
  }

  console.log(`Seeded ${sampleGames.length} games for demo user`);
}

seed()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());