import PocketBase from 'pocketbase';
import type { BaseSystemFields, TypedPocketBase } from './types.g.ts';
import { type IDataCrud, Paginated, PaginationOptions } from "@common/database/crud";

let pb: TypedPocketBase | null;
export function initDatabase(url: string) {
    if (!pb) {
        pb = new PocketBase(url) as TypedPocketBase;
    }
}

export function usePocketBase() {
    function getPb(): TypedPocketBase {
        if (!pb)
            throw new Error("PocketBase is not initialized. Call init(url) first.");
        return pb;
    }

    return {
        pb: getPb(),
    }
}

export class PocketbaseCrud<TResponse extends BaseSystemFields> implements IDataCrud<TResponse> {

    constructor(
        protected readonly collectionName: string,
        protected readonly searchFields: string[] | undefined = undefined,
        protected readonly expands: string[] | undefined = undefined,
    ) {}

    async create(data: TResponse): Promise<string>
    {
        const { pb } = usePocketBase();
        const collection = pb.collection(this.collectionName);
        const record = await collection.create<TResponse>(data);
        return record.id;
    }

    async update(id: string, data: TResponse): Promise<void>
    {
        const { pb } = usePocketBase();
        const collection = pb.collection(this.collectionName);
        await collection.update<TResponse>(id, data);
    }

    async delete(id: string): Promise<void>
    {
        const { pb } = usePocketBase();
        const collection = pb.collection(this.collectionName);
        await collection.delete(id);
    }

    async getById(id: string): Promise<TResponse | null>
    {
        const { pb } = usePocketBase();
        const collection = pb.collection(this.collectionName);
        return await collection.getOne<TResponse>(id, { expand: this.expands?.join(",") });
    }

    async getAll(options: PaginationOptions): Promise<Paginated<TResponse>>
    {
        const { pb } = usePocketBase();
        const collection = pb.collection(this.collectionName);
        const result = await collection.getList<TResponse>(options.page, options.perPage, {
            expand: this.expands?.join(","),
            sort: options.sortBy ? `${options.sortDirection}${options.sortBy}` : undefined,
        });

        return new Paginated<TResponse>(result.items, result.totalItems, options);
    }

    async search(search: string, options: PaginationOptions): Promise<Paginated<TResponse>>
    {
        if (!this.searchFields || this.searchFields.length === 0)
            return this.getAll(options);

        const { pb } = usePocketBase();
        const collection = pb.collection(this.collectionName);
        const filter = this.searchFields.map(field => `${field}~'${search}'`).join(" || ");
        const result = await collection.getList<TResponse>(options.page, options.perPage, {
            expand: this.expands?.join(","),
            sort: options.sortBy ? `${options.sortDirection}${options.sortBy}` : undefined,
            filter: filter,
        });
        return new Paginated<TResponse>(result.items, result.totalItems, options);
    }
}