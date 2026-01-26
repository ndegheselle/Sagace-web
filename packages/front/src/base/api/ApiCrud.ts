import type { BaseEntity } from '@sagace/common';
import { Paginated, PaginationOptions } from '@sagace/common';

export interface IApiCrud<T extends BaseEntity> {
    create(data: T): Promise<string>;
    update(id: string, data: T): Promise<void>;
    delete(id: string): Promise<void>;

    getById(id: string): Promise<T | null>;
    getAll(options: PaginationOptions): Promise<Paginated<T>>;
    search(search: string, options: PaginationOptions): Promise<Paginated<T>>;
}

export class ApiCrud<T extends BaseEntity> implements IApiCrud<T> {
    constructor(
        private readonly type: new (data: any) => T,
        protected readonly baseUrl: string,
        protected readonly headers: HeadersInit = {
            "Content-Type": "application/json",
        }
    ) {}

    private buildQuery(params: Record<string, any>): string {
        const query = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                query.append(key, String(value));
            }
        });

        return query.toString();
    }

    async getById(id: string): Promise<T | null> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: "GET",
            headers: this.headers,
            credentials: "include"
        });

        if (response.status === 404)
            return null;
        if (!response.ok)
            throw new Error(`Failed to get entity with id ${id}`);

        return new this.type(await response.json());
    }

    async getAll(options: PaginationOptions): Promise<Paginated<T>> {
        const query = this.buildQuery(options);

        const response = await fetch(`${this.baseUrl}?${query}`, {
            method: "GET",
            headers: this.headers,
            credentials: "include"
        });

        if (!response.ok)
            throw new Error("Failed to fetch entities");

        const json = await response.json();
        return new Paginated<T>(json.data.map((item: any) => new this.type(item)), json.total, options);
    }

    async search(search: string, options: PaginationOptions): Promise<Paginated<T>> {
        const query = this.buildQuery({
            search,
            ...options,
        });

        const response = await fetch(`${this.baseUrl}/search?${query}`, {
            method: "GET",
            headers: this.headers,
            credentials: "include"
        });

        if (!response.ok)
            throw new Error("Failed to search entities");

        const json = await response.json();
        return new Paginated<T>(json.data.map((item: any) => new this.type(item)), json.total, options);
    }

    async create(data: T): Promise<string> {
        const response = await fetch(this.baseUrl, {
            method: "POST",
            headers: this.headers,
            credentials: "include",
            body: JSON.stringify(data),
        });

        if (!response.ok)
            throw new Error("Failed to create entity");

        const result = await response.json();
        return result.id;
    }

    async update(id: string, data: T): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: "PUT",
            headers: this.headers,
            credentials: "include",
            body: JSON.stringify(data),
        });

        if (!response.ok)
            throw new Error(`Failed to update entity with id ${id}`);
    }

    async delete(id: string): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: "DELETE",
            credentials: "include"
        });

        if (!response.ok)
            throw new Error(`Failed to delete entity with id ${id}`);
    }
}