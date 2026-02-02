import { usePocketBase } from "@common/database/pocketbase.ts";
import { type CompaniesResponse, type UsersResponse, Collections } from "@common/database/types.g.ts";

export type UserExpand = {
    company: CompaniesResponse;
};

async function login(email: string, password: string): Promise<UsersResponse<UserExpand> | null> {
    const { pb } = usePocketBase();
    const collection = pb.collection(Collections.Users);

    const result = await collection.authWithPassword<UsersResponse<UserExpand>>(email, password, { expand: "company" });
    return result?.record;
}

async function refresh(): Promise<UsersResponse<UserExpand> | null> {
    const { pb } = usePocketBase();
    const collection = pb.collection(Collections.Users);
    
    const result = await collection.authRefresh<UsersResponse<UserExpand>>({ expand: "company" });
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