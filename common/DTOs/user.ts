import type { BaseEntity } from '../base/BaseEntity.ts';

export class CompanyDTO {
    name: string = '';
    email: string = '';
    adress: string = '';
    SIRET: string = '';
    phone: string = '';

    constructor(data: any = {}) {
        this.name = data.name || this.name;
        this.email = data.email || this.email;
        this.adress = data.adress || this.adress;
        this.SIRET = data.SIRET || this.SIRET;
        this.phone = data.phone || this.phone;
    }
}

export class UserDTO implements BaseEntity {
    _id: string = '';
    email: string = '';
    name: string = '';
    company: CompanyDTO = new CompanyDTO();

    constructor(data: any = {}) {
        this._id = data._id || this._id;
        this.email = data.email || this.email;
        this.name = data.name || this.name;
        this.company = new CompanyDTO(data.company);
    }
}