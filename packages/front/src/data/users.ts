import { CompanyDTO } from '@sagace/common';
import { User } from './auth';

async function get(): Promise<User> {
    const response = await fetch(import.meta.env.VITE_API_URL + '/users/current', {
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
    }

    const json = await response.json();
    return new User(json);
}

async function updateCompany(company: CompanyDTO) {
    const response = await fetch(import.meta.env.VITE_API_URL + '/users/current/company', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(company),
    });

    if (!response.ok)
        throw new Error(`Failed to update entity.`);
}

async function updateCompanyLogo(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(import.meta.env.VITE_API_URL + '/users/current/company/logo', {
        method: 'POST',
        body: formData,
        credentials: 'include'
    })

    if (!response.ok) {
        throw new Error('Upload failed')
    }

    const result = await response.json();
    return result.url;
}

export const api = {
    get,
    updateCompany,
    updateCompanyLogo
}