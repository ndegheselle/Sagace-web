import { FakeApiCrud } from "@/lib/base/FakeApiCrud";

export class Client {
    id: string;
    createdAt: Date;
    updatedAt: Date | undefined;
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    phone: string;
    address: string;

    constructor()
    {
        this.id = '';
        this.createdAt = new Date();
        this.updatedAt = undefined;
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.company = '';
        this.phone = '';
        this.address = '';
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}

// Helper function to create a client with random data
function createFakeClient(overrides: Partial<Client> = {}): Client {
    const client = new Client();
    const randomId = Math.random().toString(36).substring(2, 9);
    const now = new Date();

    return {
        ...client,
        id: overrides.id || randomId,
        createdAt: overrides.createdAt || now,
        updatedAt: overrides.updatedAt || now,
        firstName: overrides.firstName || `First${randomId}`,
        lastName: overrides.lastName || `Last${randomId}`,
        email: overrides.email || `client${randomId}@example.com`,
        company: overrides.company || `Company${randomId}`,
        phone: overrides.phone || `+123456789${randomId.substring(0, 2)}`,
        address: overrides.address || `${randomId} Main St, City${randomId}`,
    } as Client;
}

// Create some fake clients
const fakeClients = [
    createFakeClient({ firstName: "John", lastName: "Doe", email: "john.doe@example.com", company: "Doe Inc" }),
    createFakeClient({ firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", company: "Smith Corp" }),
    createFakeClient({ firstName: "Alice", lastName: "Johnson", email: "alice.johnson@example.com", company: "Johnson Ltd" }),
    createFakeClient({ firstName: "Bob", lastName: "Brown", email: "bob.brown@example.com", company: "Brown & Co" }),
    createFakeClient({ firstName: "Charlie", lastName: "Davis", email: "charlie.davis@example.com", company: "Davis Tech" }),
];

// Initialize the API with fake clients
export const api = new FakeApiCrud<Client>(fakeClients);