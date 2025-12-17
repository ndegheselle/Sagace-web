import bcrypt from 'bcrypt';
import { prisma } from "../prisma";
import type { User } from '../generated/client';

async function create(email: string, password: string, name: string): Promise<User> {
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

async function getByEmailAndPassword(email: string, password: string): Promise<User | null> {
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

export default {
    create,
    getByEmailAndPassword
};