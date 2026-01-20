import { UserDTO } from '@sagace/common';

export class User extends UserDTO {
    constructor(data: any = {}) {
        console.log(data);
        super(data);
        console.log(this.company);
    }
}

async function login(email: string, password: string): Promise<User | null> {
    const response = await fetch(import.meta.env.VITE_API_URL + '/auth/login', {
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

async function logout() {
    await fetch(import.meta.env.VITE_API_URL + '/auth/logout', {
        method: 'POST',
        credentials: 'include',
    });
}

export const api = {
    login,
    logout
};