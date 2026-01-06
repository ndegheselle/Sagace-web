import type { BaseEntity } from "../base/BaseEntity.ts";

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