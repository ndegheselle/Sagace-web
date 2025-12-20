import { Paginated, PaginationOptions } from "@/lib/base/paginated";
import type { IApiCrud } from "@/lib/base/ApiCrud";

export class FakeApiCrud<T> implements IApiCrud<T> {
    constructor(private elements: T[]) {}

    async create(data: T): Promise<T> {
        this.elements.push(data);
        return Promise.resolve(data);
    }

    async update(id: string, data: T): Promise<T> {
        const index = this.elements.findIndex((el: any) => el.id === id);
        if (index === -1) {
            throw new Error("Element not found");
        }
        this.elements[index] = data;
        return Promise.resolve(data);
    }

    async delete(id: string): Promise<void> {
        this.elements = this.elements.filter((el: any) => el.id !== id);
        return Promise.resolve();
    }

    async getById(id: string): Promise<T | null> {
        const element = this.elements.find((el: any) => el.id === id);
        return Promise.resolve(element || null);
    }

    async getAll(options: PaginationOptions): Promise<Paginated<T>> {
        const { page, limit } = options;
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedData = this.elements.slice(start, end);

        return Promise.resolve(new Paginated<T>(paginatedData, this.elements.length, options));
    }
}