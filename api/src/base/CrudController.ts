import { Paginated, PaginationOptions, SortDirection } from "sagace-common/base/paginated";
import type { FastifyInstance, FastifyRequest, FastifyReply  } from "fastify";

function sanitizeSearch(search?: string): string | undefined {
    if (!search) return undefined;
    const s = search.trim().toLowerCase();
    return s.length ? s : undefined;
}

function buildPagination(options: PaginationOptions) {
    const { page, limit } = options;

    // Negative page or limit => return all
    if (page < 0 || limit < 0) {
        return {};
    }

    const skip = (page - 1) * limit;
    return { skip, take: limit };
}

function buildOrderBy(options: PaginationOptions) {
    const { orderBy, orderDirection } = options;
    if (!orderBy) return undefined;

    return {
        [orderBy]: orderDirection === SortDirection.DESC ? "desc" : "asc",
    };
}

export type TableDelegate<T extends { id: string }> = {
    findMany(args?: {
        skip?: number;
        take?: number;
        where?: unknown;
        orderBy?: any;
    }): Promise<T[]>;

    count(args?: {
        where?: unknown;
    }): Promise<number>;

    findUnique(args: {
        where: { id: string };
    }): Promise<T | null>;

    create(args: {
        data: T;
    }): Promise<T>;

    update(args: {
        where: { id: string };
        data: Partial<T>;
    }): Promise<T>;

    delete(args: {
        where: { id: string };
    }): Promise<T>;
}

export class CrudController<T extends { id: string }> {
    constructor(
        private readonly table: TableDelegate<T>,
        private readonly searchFields: (keyof T)[]
    ) {}

    registerRoutes(fastify: FastifyInstance) {
        fastify.get("/", this.getAll.bind(this));
        fastify.get("/search", this.search.bind(this));
        fastify.get("/:id", this.getById.bind(this));
        fastify.post("/", this.create.bind(this));
        fastify.put("/:id", this.update.bind(this));
        fastify.delete("/:id", this.remove.bind(this));
    }

    // GET /
    async getAll(request: FastifyRequest) {
        const query = request.query as PaginationOptions;

        const pagination = buildPagination(query);
        const orderBy = buildOrderBy(query);

        const [data, total] = await Promise.all([
            this.table.findMany({
                skip: pagination.skip,
                take: pagination.take,
                orderBy,
            }),
            this.table.count(),
        ]);

        return new Paginated<T>(data, total, query);
    }

    // GET /search
    async search(request: FastifyRequest) {
        const { search, ...rest } = request.query as any;
        const sanitized = sanitizeSearch(search);

        const pagination = buildPagination(rest);
        const orderBy = buildOrderBy(rest);

        const where = sanitized
            ? {
                  OR: this.searchFields.map((field) => ({
                      [field as string]: {
                          contains: sanitized,
                          mode: "insensitive",
                      },
                  })),
              }
            : undefined;

        const [data, total] = await Promise.all([
            this.table.findMany({
                skip: pagination.skip,
                take: pagination.take,
                where,
                orderBy,
            }),
            this.table.count({ where }),
        ]);

        return new Paginated<T>(data, total, rest);
    }

    // GET /:id
    async getById(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const entity = await this.table.findUnique({
            where: { id },
        });

        if (!entity) {
            reply.code(404);
            return;
        }

        return entity;
    }

    // POST /
    async create(request: FastifyRequest, reply: FastifyReply) {
        const data = request.body as T;

        const entity = await this.table.create({ data });

        reply.code(201);
        return { id: entity.id };
    }

    // PUT /:id
    async update(request: FastifyRequest) {
        const { id } = request.params as { id: string };
        const data = request.body as T;

        await this.table.update({
            where: { id },
            data,
        });
    }

    // DELETE /:id
    async remove(request: FastifyRequest) {
        const { id } = request.params as { id: string };

        await this.table.delete({
            where: { id },
        });
    }
}