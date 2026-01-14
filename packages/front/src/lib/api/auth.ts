import settings from "@/lib/api/settings";
import { UserDTO } from "@sagace/common/DTOs/user";

export class User extends UserDTO {
}

async function login(email: string, password: string): Promise<User | null>
{
    const response = await fetch(settings.apiUrl +'/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
    }

    return await response.json();
}

export const api = {
    login
};