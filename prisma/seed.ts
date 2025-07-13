import { PrismaClient, UserRoleType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: process.env.ADMIN_EMAIL || "",
      role: UserRoleType.ADMIN,
      name: process.env.ADMIN_NAME || "admin",
      emailVerified: new Date(),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
