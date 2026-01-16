import { UserDTO } from "@sagace/common/DTOs/user";

export class User extends UserDTO {
}

async function login(email: string, password: string): Promise<User | null>
{
    const response = await fetch(import.meta.env.VITE_API_URL +'/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
    }

    return new User(await response.json());
}

async function logout()
{
    await fetch(import.meta.env.VITE_API_URL +'/auth/logout', {
        method: 'POST',
        credentials: 'include',
    });
}

async function getUser()
{
    const response = await fetch(import.meta.env.VITE_API_URL +'/users/current', {
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
    }

    return new User(await response.json());
}

export const api = {
    login,
    logout,
    getUser
};