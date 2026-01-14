export class CompanyDTO {
    constructor(data = {}) {
        this.name = '';
        this.email = '';
        this.adress = '';
        this.SIRET = '';
        this.phone = '';
        this.name = data.name || this.name;
        this.email = data.email || this.email;
        this.adress = data.adress || this.adress;
        this.SIRET = data.SIRET || this.SIRET;
        this.phone = data.phone || this.phone;
    }
}
export class UserDTO {
    constructor(data = {}) {
        this._id = '';
        this.email = '';
        this.name = '';
        this.company = new CompanyDTO();
        this._id = data._id || this._id;
        this.email = data.email || this.email;
        this.name = data.name || this.name;
        this.company = new CompanyDTO(data.company);
    }
}
