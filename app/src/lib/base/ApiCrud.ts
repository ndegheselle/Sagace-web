import { Paginated, PaginationOptions } from "@/lib/base/paginated";

export interface IApiCrud<T> {
    create(data: T): Promise<T>;
    update(id: string, data: T): Promise<T>;
    delete(id: string): Promise<void>;
    getById(id: string): Promise<T | null>;
    getAll(options: PaginationOptions): Promise<Paginated<T>>;
}