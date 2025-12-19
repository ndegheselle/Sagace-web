import type { BaseEntity } from '../base/BaseEntity';

export type UserDTO = BaseEntity & {
    name: string;
    email: string;
    id: string;
};