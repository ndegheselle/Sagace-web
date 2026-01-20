import { Collection, type Document, type Filter, type Sort } from 'mongodb';
import { Paginated, PaginationOptions } from '@sagace/common/base/paginated';

export interface JoinConfig {
    from: string;              // foreign collection
    localField: string;        // field in current collection
    foreignField: string;      // field in foreign collection
    as: string;                // output field
    unwind?: boolean;          // optional $unwind
    projection?: Record<string, 0 | 1>; // optional projection for joined docs
}

export class CrudRepository<T extends Document> {
    constructor(
        protected collection: Collection<T>,
        protected searchFields: string[],
        protected projection: Record<string, 0 | 1> | undefined = undefined,
        protected joins: JoinConfig[] = []) { }

    protected buildJoinPipeline(): any[] {
        return this.joins.flatMap(join => {
            const stages: any[] = [
                {
                    $lookup: {
                        from: join.from,
                        localField: join.localField,
                        foreignField: join.foreignField,
                        as: join.as
                    }
                }
            ];

            if (join.unwind) {
                stages.push({ $unwind: { path: `$${join.as}`, preserveNullAndEmptyArrays: true } });
            }

            if (join.projection) {
                stages.push({ $project: join.projection });
            }

            return stages;
        });
    }

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
        if (this.joins.length === 0) {
            return await this.collection.findOne(
                { _id: id } as Filter<T>,
                { projection: this.projection }
            ) as T | null;
        }

        const pipeline = [
            { $match: { _id: id } },
            ...this.buildJoinPipeline(),
            ...(this.projection ? [{ $project: this.projection }] : [])
        ];

        const result = await this.collection.aggregate(pipeline).toArray();
        return (result[0] as T) ?? null;
    }

    async getAll(options: PaginationOptions): Promise<Paginated<T>> {
        const skip = options.page <= 0 ? 0 : (options.page - 1) * options.limit;
        const limit = options.limit;

        const sortStage = options.orderBy
            ? [{ $sort: { [options.orderBy]: options.orderDirection === 1 ? 1 : -1 } }]
            : [];

        if (this.joins.length === 0) {
            // fallback to normal find (fast path)
            const data = await this.collection
                .find({}, { projection: this.projection })
                .skip(skip)
                .limit(limit)
                .toArray();

            const total = await this.collection.countDocuments();
            return new Paginated(data as T[], total, options);
        }

        // aggregation path
        const pipeline = [
            ...this.buildJoinPipeline(),
            ...sortStage,
            { $skip: skip },
            { $limit: limit }
        ];

        const [data, count] = await Promise.all([
            this.collection.aggregate(pipeline).toArray(),
            this.collection.countDocuments()
        ]);

        return new Paginated(data as T[], count, options);
    }

    async search(search: string, options: PaginationOptions): Promise<Paginated<T>> {
        const skip = options.page <= 0 ? 0 : (options.page - 1) * options.limit;
        const limit = options.limit;

        const sortStage = options.orderBy
            ? [{ $sort: { [options.orderBy]: options.orderDirection === 1 ? 1 : -1 } }]
            : [];

        const matchStage = {
            $match: {
                $or: this.searchFields.map(field => ({
                    [field]: { $regex: search, $options: 'i' }
                }))
            }
        };

        if (this.joins.length === 0) {
            const [data, total] = await Promise.all([
                this.collection
                    .find(matchStage.$match as Filter<T>, { projection: this.projection })
                    .sort(sortStage[0]?.$sort as Sort ?? {})
                    .skip(skip)
                    .limit(limit)
                    .toArray(),
                this.collection.countDocuments(matchStage.$match as Filter<T>)
            ]);

            return new Paginated<T>(data as T[], total, options);
        }

        const pipeline = [
            matchStage,
            ...this.buildJoinPipeline(),
            ...sortStage,
            { $skip: skip },
            { $limit: limit },
            ...(this.projection ? [{ $project: this.projection }] : [])
        ];

        const countPipeline = [
            matchStage,
            ...this.buildJoinPipeline(),
            { $count: 'total' }
        ];

        const [data, count] = await Promise.all([
            this.collection.aggregate(pipeline).toArray(),
            this.collection.aggregate(countPipeline).toArray()
        ]);

        return new Paginated<T>(
            data as T[],
            count[0]?.total ?? 0,
            options
        );
    }
}