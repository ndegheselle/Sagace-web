import type { BaseEntity } from '../base/BaseEntity';

export type ClientDTO = BaseEntity & {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    phone: string;
    address: string;
};