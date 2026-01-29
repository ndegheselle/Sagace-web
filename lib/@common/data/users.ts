import { usePocketBase } from '@/database/pocketbase.ts';
import { Collections, type UsersRecord } from "@/database/types.g.ts";

const { pb } = usePocketBase();
const collection = pb.collection(Collections.Users);

async function login(email: string, password: string): Promise<UsersRecord | null> {
    const result = await collection.authWithPassword(
        email,
        password,
    );
    return result.record;
}

function logout() {
    pb.authStore.clear();
}

async function refresh(): Promise<UsersRecord> {
    const result = await collection.authRefresh();
    return result.record;
}

export const users = {
    login,
    logout,
    refresh
}