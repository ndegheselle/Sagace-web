import type { BaseEntity } from '../base/BaseEntity.js';

export class CompanyDTO {
    name: string;
    email: string;
    adress: string;
    SIRET: string;
    phone: string;
    logoUrl: string;

    constructor(data: any = {}) {
        this.name = data.name || '';
        this.email = data.email || '';
        this.adress = data.adress || '';
        this.SIRET = data.SIRET || '';
        this.phone = data.phone || '';
        this.logoUrl = data.logoUrl || '';
    }
}

export class UserDTO implements BaseEntity {
    _id: string;
    email: string;
    name: string;
    company: CompanyDTO = new CompanyDTO();

    constructor(data: any = {}) {
        this._id = data._id || '';
        this.email = data.email || '';
        this.name = data.name || '';
        this.company = new CompanyDTO(data.company);
    }
}