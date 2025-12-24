import { Paginated, PaginationOptions } from "@/lib/base/paginated";

export interface BaseEntity
{
    id: string;
}

export interface IApiCrud<T extends BaseEntity> {
    create(data: T): Promise<string>;
    update(id: string, data: T): Promise<void>;
    delete(id: string): Promise<void>;
    getById(id: string): Promise<T | null>;
    getAll(options: PaginationOptions): Promise<Paginated<T>>;
    search(search: string, options: PaginationOptions): Promise<Paginated<T>>;
}