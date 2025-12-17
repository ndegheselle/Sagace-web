import type { BaseEntity } from '~~/shared/base/BaseEntity';
import { Paginated, PaginationOptions } from '~~/shared/base/paginated';

export class CrudClient<T extends BaseEntity> {

    constructor(private baseUrl: string) { }

    async create(data: T) {
        await $fetch<T>(`/api/${this.baseUrl}`, {
            method: 'POST',
            body: data,
            credentials: 'include'
        });
    }

    async update(id: string, data: T): Promise<T> {
        return await $fetch<T>(`/api/${this.baseUrl}/${id}`, {
            method: 'PUT',
            body: data,
            credentials: 'include'
        });
    }

    async delete(id: string){
        await $fetch<T>(`/api/${this.baseUrl}/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
    }

    async getById(id: string): Promise<T | null> {
        return await $fetch<T | null>(`/api/${this.baseUrl}/${id}`, {
            method: 'GET',
            credentials: 'include'
        });
    }

    async getAll(options: PaginationOptions): Promise<Paginated<T>> {
        return await $fetch<Paginated<T>>(`/api/${this.baseUrl}`, {
            method: 'GET',
            query: { 
                page: options.page,
                limit: options.limit,
                orderBy: options.orderBy,
                orderDirection: options.orderDirection,
            },
            credentials: 'include'
        });
    }
}