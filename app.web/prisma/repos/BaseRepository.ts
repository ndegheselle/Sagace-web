import { Paginated } from "~~/shared/base/paginated";

/**
 * Minimal Prisma delegate interface needed for CRUD
 */
type PrismaDelegate<T, CreateInput, UpdateInput> = {
  create(args: { data: CreateInput }): Promise<T>;
  findUnique(args: { where: { id: string } }): Promise<T | null>;
  findMany(args: any): Promise<T[]>;
  update(args: { where: { id: string }; data: UpdateInput }): Promise<T>;
  delete(args: { where: { id: string } }): Promise<T>;
  count(args?: any): Promise<number>;
};

export class BaseRepository<
  T,
  CreateInput,
  UpdateInput
> {
  constructor(protected readonly model: PrismaDelegate<T, CreateInput, UpdateInput>) {}

  async create(data: CreateInput): Promise<T> {
    return this.model.create({ data });
  }

  async getById(id: string): Promise<T | null> {
    return this.model.findUnique({
      where: { id },
    });
  }

  async getAll(
    page = 1,
    limit = 10,
    orderBy: Record<string, "asc" | "desc"> = { createdAt: "desc" }
  ): Promise<Paginated<T>> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.model.findMany({
        skip,
        take: limit,
        orderBy,
      }),
      this.model.count(),
    ]);

    return new Paginated<T>(data, total, page, limit);
  }

  async updateById(id: string, data: UpdateInput): Promise<T> {
    return this.model.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: string): Promise<T> {
    return this.model.delete({
      where: { id },
    });
  }
}