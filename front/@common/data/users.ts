import { type UsersRecord, Collections } from "@common/database/types.g.ts";
import { usePocketBase } from "@common/database/pocketbase.ts";


async function login(email: string, password: string): Promise<UsersRecord | null> {
    const { pb } = usePocketBase();
    const collection = pb.collection(Collections.Users);

    const result = await collection.authWithPassword(email, password);
    return result?.record;
}

async function refresh(): Promise<UsersRecord | null> {
    const { pb } = usePocketBase();
    const collection = pb.collection(Collections.Users);
    
    const result = await collection.authRefresh();
    return result?.record;
}

function logout() {
    const { pb } = usePocketBase();
    pb.authStore.clear();
}

export const users = {
    login,
    refresh,
    logout,
}