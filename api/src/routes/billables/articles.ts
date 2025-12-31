import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { prisma } from '@/database/prisma';
import { CrudController } from '@/base/CrudController';
import type { StockArticle } from '@/database/generated/client';

const clientsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    const controller = new CrudController<StockArticle>(
        prisma.stockArticle,
        ["name", "sku"]
    );
    controller.registerRoutes(fastify);
};

export default clientsRoutes;