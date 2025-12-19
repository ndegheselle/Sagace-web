import bcrypt from 'bcrypt';
import { User } from "./generated/client";
import { prisma } from "./prisma";

/**
 * @param {string} email
 * @param {string} password
 * @param {string} name
 * @returns {Promise<User>}
 */
async function create(email, password, name) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name
        }
    });
    user.password = '';
    return user;
}

async function seed()
{
    await create('admin', 'Test123', 'Admin');
}

seed()
  .finally(async () => {
    await prisma.$disconnect();
  });