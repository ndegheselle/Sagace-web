import users from "./repos/users";
import { prisma } from "./prisma";

async function seed()
{
    await users.create('admin', 'Test123', 'Admin');
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });