export class ClientDTO {
    constructor(data = {}) {
        this._id = data._id || '';
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt;
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.email = data.email || '';
        this.company = data.company || '';
        this.phone = data.phone || '';
        this.address = data.address || '';
    }
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    get isNew() {
        return !this._id;
    }
}
