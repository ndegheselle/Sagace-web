import { Paginated, PaginationOptions } from "@/lib/base/paginated";
import type { BaseEntity, IApiCrud } from "@/lib/base/ApiCrud";

function makeid(length: number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export class FakeApiCrud<T extends BaseEntity> implements IApiCrud<T> {
    constructor(protected elements: T[], protected searchFields: string[]) { }

    async create(data: T): Promise<string> {
        data.id = makeid(10);
        this.elements.push(data);
        return Promise.resolve(data.id);
    }

    async update(id: string, data: T): Promise<void> {
        const index = this.elements.findIndex((el: any) => el.id === id);
        if (index === -1) {
            throw new Error("Element not found");
        }
        this.elements[index] = data;
        return Promise.resolve();
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

    async search(search: string, options: PaginationOptions): Promise<Paginated<T>> {
        const { page, limit } = options;
        const normalizedSearch = search.toLowerCase();

        const filtered = this.elements.filter((el: any) => {
            return this.searchFields.some((field: string) => {
                const fieldValue = el[field];
                return (
                    typeof fieldValue === "string" &&
                    fieldValue.toLowerCase().includes(normalizedSearch)
                );
            });
        });

        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedData = filtered.slice(start, end);

        return Promise.resolve(
            new Paginated<T>(paginatedData, filtered.length, options)
        );
    }
}