import bcrypt from 'bcrypt';
import type { User } from '~~/server/prisma/generated/client';
import { prisma } from "~~/server/prisma/prisma";

export async function create(email: string, password: string, name: string): Promise<User> {
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

export async function getByEmailAndPassword(email: string, password: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
        where: { email }
    });
    if (!user) {
        return null;
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return null;
    }
    user.password = '';
    return user;
}

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event);
    if (!email || !password) {
        throw createError({
            statusCode: 400,
            message: 'Email and password are required'
        });
    }

    // Find user
    const user = await getByEmailAndPassword(email, password);
    if (!user) {
        throw createError({
            statusCode: 401,
            message: 'Invalid credentials'
        });
    }

    // Set user session
    await setUserSession(event, {
        user: {
            id: user.id,
            email: user.email,
            name: user.name
        }
    });
})