import { User, Company } from "./auth.model";

let userCounter = 1;
function createFakeCompany(overrides: Partial<Company> = {}): Company {
    const company = new Company();
    const id = userCounter;

    Object.assign(company, {
        name: overrides.name ?? `Company ${id}`,
        email: overrides.email ?? `company${id}@example.com`,
        adress: overrides.adress ?? `${id} Business St, City`,
        SIRET: overrides.SIRET ?? `SIRET-${100000000 + id}`,
        phone: overrides.phone ?? "+33123456789",
    });

    return company;
}

function createFakeUser(overrides: Partial<User> = {}): User {
    const user = new User();
    const id = overrides.id ?? `user-${userCounter++}`;

    Object.assign(user, {
        id,
        name: overrides.name ?? `User ${id}`,
        email: overrides.email ?? `${id}@example.com`,
        company: overrides.company ?? createFakeCompany(),
    });

    return user;
}

async function login(email: string, password: string): Promise<User | null>
{
    return Promise.resolve(fakeUser);
}

export const fakeUser = createFakeUser({
        name: "John Doe",
        email: "john.doe@example.com",
        company: createFakeCompany({ name: "Doe Industries" }),
    });

export const api = {
    login
};