import { Service } from 'sagace-common/models/billables/service';

let serviceCounter = 1;

function createFakeService(overrides: Partial<Service> = {}): Service {
    const service = new Service();
    const now = new Date();

    const _id = overrides._id ?? `service-${serviceCounter++}`;

    Object.assign(service, {
        _id,
        createdAt: overrides.createdAt ?? now,
        updatedAt: overrides.updatedAt ?? now,
        name: overrides.name ?? `Service ${_id}`,
        code: overrides.code ?? `SRV-${_id.toUpperCase()}`,
        description: overrides.description ?? `Description for ${_id}`,
        unitPrice: overrides.unitPrice ?? 50,
        durationHours: overrides.durationHours,
    });

    return service;
}

export const fakeServices: Service[] = [
    createFakeService({
        name: "Website Development",
        code: "SRV-WEB-001",
        unitPrice: 75,
        durationHours: 40,
    }),
    createFakeService({
        name: "UI/UX Design",
        code: "SRV-DESIGN-002",
        unitPrice: 65,
        durationHours: 20,
    }),
    createFakeService({
        name: "SEO Optimization",
        code: "SRV-SEO-003",
        unitPrice: 55,
        durationHours: 10,
    }),
    createFakeService({
        name: "Server Maintenance",
        code: "SRV-MAINT-004",
        unitPrice: 90,
        durationHours: 5,
    }),
    createFakeService({
        name: "Consulting",
        code: "SRV-CONSULT-005",
        unitPrice: 120,
    }),
];