import bcrypt from 'bcrypt';
import client from "./_client";
import { User } from '@prisma/client';

async function create(email: string, password: string, name: string): User {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await client.user.create({
        data: {
            email,
            password: hashedPassword,
            name
        }
    });
    user.password = '';
    return user;
}

async function GetByEmailAndPassword(email: string, password: string): Promise<User | null> {
    const user = await client.user.findUnique({
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
    GetByEmailAndPassword
}