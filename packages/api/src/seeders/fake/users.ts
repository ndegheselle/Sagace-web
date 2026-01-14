import { User, Company } from '@/models/UsersRepository.js';
import bcrypt from 'bcrypt';

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

async function createFakeUser(overrides: Partial<User> = {}): Promise<User> {
    const user = new User();
    const _id = overrides._id ?? `user-${userCounter++}`;

    Object.assign(user, {
        _id,
        name: overrides.name ?? `User ${_id}`,
        email: overrides.email ?? `${_id}@example.com`,
        company: overrides.company ?? createFakeCompany(),
        password: await bcrypt.hash(overrides.password ?? 'password123', 10) 
    });

    return user;
}

export const fakeUser = await createFakeUser({
        name: "John Doe",
        email: "john.doe@example.com",
        company: createFakeCompany({ name: "Doe Industries" }),
    });
