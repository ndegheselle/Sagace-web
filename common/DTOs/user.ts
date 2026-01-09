import type { BaseEntity } from '@/base/BaseEntity';

export class CompanyDTO {
    name: string = '';
    email: string = '';
    adress: string = '';
    SIRET: string = '';
    phone: string = '';
}

export class UserDTO implements BaseEntity {
    _id: string = '';
    email: string = '';
    name: string = '';
    company: CompanyDTO = new CompanyDTO();
}