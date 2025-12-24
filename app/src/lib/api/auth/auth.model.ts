export class User
{
    id: string;
    email: string;
    name: string;

    company: Company;

    constructor() {
        this.id = '';
        this.email = '';
        this.name = '';
        this.company = new Company();
    }
}

export class Company
{
    name: string;
    email: string;
    adress: string;
    SIRET: string;
    phone: string;

    constructor() {
        this.email = '';
        this.name = '';
        this.adress = '';
        this.SIRET = '';
        this.phone = '';
    }
}