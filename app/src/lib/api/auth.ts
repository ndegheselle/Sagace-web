export class User
{
    id: string;
    email: string;
    name: string;

    constructor(id: string, email: string, name: string) {
        this.id = id;
        this.email = email;
        this.name = name;
    }
}

async function login(email: string, password: string): Promise<User | null>
{
    return Promise.resolve(new User('', email, 'guest'));
}

export const api = {
    login
};