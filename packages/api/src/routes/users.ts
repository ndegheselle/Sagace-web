import { Company, usersRepo } from '@/models/UsersRepository';
import type { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const usersRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {

    fastify.get('/current', async (request: FastifyRequest, reply: FastifyReply) => {
        const userId = request.user.id;
        const entity = await usersRepo.getById(userId);

        if (!entity) {
            reply.code(404);
            return;
        }

        return entity;
    });

    fastify.put('/current/company', async function (request) {
        const userId = request.user.id;
        const data = request.body as Company;
        await usersRepo.updateCompany(userId, data);
    });

    fastify.post('/current/company/logo', async function (request, reply) {
        const data = await request.file();
        const userId = request.user.id;

        if (!data) {
            return reply.code(400).send({ error: 'No file uploaded' });
        }

        if (!data.mimetype.startsWith('image/')) {
            throw new Error('Invalid file type');
        }

        const uploadDir = path.join(process.cwd(), 'uploads')
        await fs.promises.mkdir(uploadDir, { recursive: true })

        const ext = path.extname(data.filename)
        const filename = crypto.randomUUID() + ext;
        const filePath = path.join(uploadDir, filename);

        await fs.promises.writeFile(filePath, await data.toBuffer())

        const logoUrl = `/images/${filename}`;
        usersRepo.updateCompanyLogo(userId, logoUrl);

        return { url: logoUrl };
    })
};

export default usersRoutes;