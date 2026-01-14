import { Client } from '@/models/ClientsRepository.js';

let clientCounter = 1;
function createFakeClient(overrides: Partial<Client> = {}): Client {
    const client = new Client();
    const now = new Date();

    const _id = overrides._id ?? `client-${clientCounter++}`;

    Object.assign(client, {
        _id,
        createdAt: overrides.createdAt ?? now,
        updatedAt: overrides.updatedAt ?? now,
        firstName: overrides.firstName ?? `First${_id}`,
        lastName: overrides.lastName ?? `Last${_id}`,
        email: overrides.email ?? `${_id}@example.com`,
        company: overrides.company ?? `Company ${_id}`,
        phone: overrides.phone ?? "+1234567890",
        address: overrides.address ?? `${clientCounter} Main St, City`,
    });

    return client;
}

// Create some fake clients
export const fakeClients = [
    createFakeClient({ firstName: "John", lastName: "Doe", email: "john.doe@example.com", company: "Doe Inc" }),
    createFakeClient({ firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", company: "Smith Corp" }),
    createFakeClient({ firstName: "Alice", lastName: "Johnson", email: "alice.johnson@example.com", company: "Johnson Ltd" }),
    createFakeClient({ firstName: "Bob", lastName: "Brown", email: "bob.brown@example.com", company: "Brown & Co" }),
    createFakeClient({ firstName: "Charlie", lastName: "Davis", email: "charlie.davis@example.com", company: "Davis Tech" }),
];