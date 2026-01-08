import { Collection, type Document, type Filter, type SortDirection as MongoSortDirection } from 'mongodb';
import { Paginated, PaginationOptions } from 'sagace-common/base/paginated';

export class CrudRepository<T extends Document> {
    constructor(
        protected collection: Collection<T>, 
        protected searchFields: string[], 
        protected projection: Record<string, 0 | 1>| undefined = undefined,) { }

    async create(data: T): Promise<string> {
        const result = await this.collection.insertOne(data as any);
        return result.insertedId.toString();
    }

    async update(id: string, data: T): Promise<void> {
        await this.collection.updateOne(
            { _id: id } as Filter<T>,
            { $set: { ...data, updatedAt: new Date() } }
        );
    }

    async delete(id: string): Promise<void> {
        await this.collection.deleteOne({ _id: id } as Filter<T>);
    }

    async count(): Promise<number> {
        return await this.collection.countDocuments();
    }

    async getById(id: string): Promise<T | null> {
        const doc = await this.collection.findOne({ _id: id } as Filter<T>, {projection: this.projection});
        return doc as T | null;
    }

    async getAll(options: PaginationOptions): Promise<Paginated<T>> {
        const skip = options.page < 0 || options.limit < 0 ? 0 : (options.page - 1) * options.limit;
        const take = options.page < 0 || options.limit < 0 ? 0 : options.limit;

        const sort: Record<string, MongoSortDirection> = options.orderBy
            ? { [options.orderBy]: options.orderDirection === 1 ? 1 : -1 }
            : {};

        const query = this.collection.find({}, {projection: this.projection});
        if (Object.keys(sort).length > 0) {
            query.sort(sort);
        }

        const [data, total] = await Promise.all([
            take > 0 ? query.skip(skip).limit(take).toArray() : query.toArray(),
            this.collection.countDocuments(),
        ]);

        return new Paginated<T>(
            data as T[],
            total,
            options
        );
    }

    async search(search: string, options: PaginationOptions): Promise<Paginated<T>> {
        const skip = options.page < 0 || options.limit < 0 ? 0 : (options.page - 1) * options.limit;
        const take = options.page < 0 || options.limit < 0 ? 0 : options.limit;

        const sort: Record<string, MongoSortDirection> = options.orderBy
            ? { [options.orderBy]: options.orderDirection === 1 ? 1 : -1 }
            : {};

        // Build the $or query dynamically based on searchFields
        const query: any = {
            $or: this.searchFields.map(field => ({
                [field]: { $regex: search, $options: 'i' }
            })),
        };

        const mongoQuery = this.collection.find(query, {projection: this.projection});
        if (Object.keys(sort).length > 0) {
            mongoQuery.sort(sort);
        }

        const [data, total] = await Promise.all([
            take > 0 ? mongoQuery.skip(skip).limit(take).toArray() : mongoQuery.toArray(),
            this.collection.countDocuments(query),
        ]);

        return new Paginated<T>(
            data as T[],
            total,
            options
        );
    }
}