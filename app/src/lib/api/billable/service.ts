import type { BaseEntity } from "@/lib/base/ApiCrud";
import { FakeApiCrud } from "@/lib/base/FakeApiCrud";
import type { BillableItem } from "../estimate";

export class Service implements BillableItem, BaseEntity  {
    id: string;
    createdAt: Date;
    updatedAt: Date | undefined;

    name: string;
    code: string;
    description?: string;
    price: number;          // unit price (e.g. per hour or per service)
    durationHours?: number; // optional duration info

    isSelected: boolean;

    constructor() {
        this.id = '';
        this.createdAt = new Date();
        this.updatedAt = undefined;

        this.name = '';
        this.code = '';
        this.price = 0;
        this.description = '';
        this.durationHours = undefined;
        this.isSelected = false;
    }

    get isNew(): boolean {
        return !this.id;
    }
}

let serviceCounter = 1;

function createFakeService(overrides: Partial<Service> = {}): Service {
    const service = new Service();
    const now = new Date();

    const id = overrides.id ?? `service-${serviceCounter++}`;

    Object.assign(service, {
        id,
        createdAt: overrides.createdAt ?? now,
        updatedAt: overrides.updatedAt ?? now,
        name: overrides.name ?? `Service ${id}`,
        code: overrides.code ?? `SRV-${id.toUpperCase()}`,
        description: overrides.description ?? `Description for ${id}`,
        price: overrides.price ?? 50,
        durationHours: overrides.durationHours,
    });

    return service;
}

export const fakeServices: Service[] = [
    createFakeService({
        name: "Website Development",
        code: "SRV-WEB-001",
        price: 75,
        durationHours: 40,
    }),
    createFakeService({
        name: "UI/UX Design",
        code: "SRV-DESIGN-002",
        price: 65,
        durationHours: 20,
    }),
    createFakeService({
        name: "SEO Optimization",
        code: "SRV-SEO-003",
        price: 55,
        durationHours: 10,
    }),
    createFakeService({
        name: "Server Maintenance",
        code: "SRV-MAINT-004",
        price: 90,
        durationHours: 5,
    }),
    createFakeService({
        name: "Consulting",
        code: "SRV-CONSULT-005",
        price: 120,
    }),
];

// Initialize the API with fake services
export const api = new FakeApiCrud<Service>(fakeServices, ['name', 'code']);