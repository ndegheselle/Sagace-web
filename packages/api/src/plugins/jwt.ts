import jwt from '@fastify/jwt';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async (fastify: FastifyInstance) => {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error('JWT_SECRET is not defined');

    fastify.register(jwt, {
        secret,
        cookie: {
            cookieName: 'token',
            signed: false
        }
    });
});

export async function authenticate(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        await request.jwtVerify();
    } catch (err) {
        reply.send(err);
    }
}