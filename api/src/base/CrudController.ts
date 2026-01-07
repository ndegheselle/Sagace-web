import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type { BaseEntity } from "sagace-common/base/BaseEntity";
import { PaginationOptions } from "sagace-common/base/paginated";
import type { CrudRepository } from "./CrudRepository";

function sanitizeSearch(search?: string): string {
    if (!search) return '';
    const s = search.trim().toLowerCase();
    return s.length ? s : '';
}

export class CrudController<T extends BaseEntity> {
    constructor(
        private readonly table: CrudRepository<T>
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
        const {page, limit, orderBy, orderDirection} = request.query as any;
        return this.table.getAll(new PaginationOptions(Number(page), Number(limit), orderBy, orderDirection));
    }

    // GET /search
    async search(request: FastifyRequest) {
        const { search, ...rest } = request.query as any;
        const sanitized = sanitizeSearch(search);
        return this.table.search(sanitized, rest);
    }

    // GET /:id
    async getById(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        console.log("Getting by ID", id);

        const entity = await this.table.getById(id);

        if (!entity) {
            reply.code(404);
            return;
        }

        return entity;
    }

    // POST /
    async create(request: FastifyRequest, reply: FastifyReply) {
        const data = request.body as T;

        const id = await this.table.create(data);
        reply.code(201);
        return { id: id };
    }

    // PUT /:id
    async update(request: FastifyRequest) {
        const { id } = request.params as { id: string };
        const data = request.body as T;

        await this.table.update(id, data);
    }

    // DELETE /:id
    async remove(request: FastifyRequest) {
        const { id } = request.params as { id: string };
        await this.table.delete(id);
    }
}