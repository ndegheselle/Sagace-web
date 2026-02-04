import PocketBase from 'pocketbase';
import type { TypedPocketBase } from './types.g.ts';
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

export class PocketbaseCrud<T extends {id: string}> implements IDataCrud<T> {

    constructor(
        protected readonly collectionName: string,
        protected readonly expand: string | undefined = undefined,
        protected readonly searchFields: string[] | undefined = undefined,
    ) {}

    async create(data: T): Promise<string>
    {
        const { pb } = usePocketBase();
        const collection = pb.collection(this.collectionName);
        const record = await collection.create<T>(data);
        return record.id;
    }

    async update(id: string, data: T): Promise<void>
    {
        const { pb } = usePocketBase();
        const collection = pb.collection(this.collectionName);
        await collection.update<T>(id, data);
    }

    async delete(id: string): Promise<void>
    {
        const { pb } = usePocketBase();
        const collection = pb.collection(this.collectionName);
        await collection.delete(id);
    }

    async getById(id: string): Promise<T | null>
    {
        const { pb } = usePocketBase();
        const collection = pb.collection(this.collectionName);
        return await collection.getOne<T>(id, { expand: this.expand });
    }

    async getAll(options: PaginationOptions): Promise<Paginated<T>>
    {
        const { pb } = usePocketBase();
        const collection = pb.collection(this.collectionName);
        const result = await collection.getList<T>(options.page, options.perPage, {
            expand: this.expand,
            sort: options.orderBy ? `${options.orderDirection}${options.orderBy}` : undefined,
        });

        return new Paginated<T>(result.items, result.totalItems, options);
    }

    async search(search: string, options: PaginationOptions): Promise<Paginated<T>>
    {
        if (!this.searchFields || this.searchFields.length === 0)
            return this.getAll(options);

        const { pb } = usePocketBase();
        const collection = pb.collection(this.collectionName);
        const filter = this.searchFields.map(field => `${field}~'${search}'`).join(" || ");
        const result = await collection.getList<T>(options.page, options.perPage, {
            expand: this.expand,
            sort: options.orderBy ? `${options.orderDirection}${options.orderBy}` : undefined,
            filter: filter,
        });
        return new Paginated<T>(result.items, result.totalItems, options);
    }
}