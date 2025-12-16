import { Paginated, PaginationOptions, SortDirection } from '~~/shared/base/paginated';

export interface BaseEntity {
    id: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class BaseRepository<T extends BaseEntity> {
    constructor(private model: any) { }

    async create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
        return await this.model.create({
            data,
        });
    }

    async update(id: string, data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>): Promise<T> {
        return await this.model.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<T> {
        return await this.model.delete({
            where: { id },
        });
    }

    async getById(id: string): Promise<T | null> {
        return await this.model.findUnique({
            where: { id },
        });
    }

    async getAll(options: PaginationOptions): Promise<Paginated<T>> {
        const {
            page = 1,
            limit = 10,
            orderBy = 'createdAt',
            orderDirection = SortDirection.DESC,
        } = options;

        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.model.findMany({
                skip,
                take: limit,
                orderBy: {
                    [orderBy]: orderDirection == SortDirection.ASC ? 'asc' : 'desc',
                },
            }),
            this.model.count(),
        ]);

        return new Paginated<T>(data, total, options);
    }

    async exists(id: string): Promise<boolean> {
        const count = await this.model.count({
            where: { id },
        });
        return count > 0;
    }

    async count(where?: any): Promise<number> {
        return await this.model.count({ where });
    }
}