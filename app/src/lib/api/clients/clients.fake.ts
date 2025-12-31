import { FakeApiCrud } from "@/lib/base/api/FakeApiCrud";
import { Client } from "./clients.model";

let clientCounter = 1;
function createFakeClient(overrides: Partial<Client> = {}): Client {
    const client = new Client();
    const now = new Date();

    const id = overrides.id ?? `client-${clientCounter++}`;

    Object.assign(client, {
        id,
        createdAt: overrides.createdAt ?? now,
        updatedAt: overrides.updatedAt ?? now,
        firstName: overrides.firstName ?? `First${id}`,
        lastName: overrides.lastName ?? `Last${id}`,
        email: overrides.email ?? `${id}@example.com`,
        company: overrides.company ?? `Company ${id}`,
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

// Initialize the API with fake clients
export const api = new FakeApiCrud<Client>(fakeClients, ['fullName']);