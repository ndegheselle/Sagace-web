import type { BaseEntity } from "sagace-common/base/BaseEntity.ts";
import settings from "@/lib/api/settings";

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

export class Company {
    name: string = '';
    email: string = '';
    adress: string = '';
    SIRET: string = '';
    phone: string = '';
}

export class User implements BaseEntity {
    _id: string = '';
    email: string = '';
    name: string = '';
    company: Company = new Company();
}

export const api = {
    login
};