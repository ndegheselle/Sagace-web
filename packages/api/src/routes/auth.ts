import { usersRepo } from '@/models/UsersRepository';
import bcrypt from 'bcrypt';
import type { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';

const authRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {

        const { email, password } = request.body as {
            email: string
            password: string
        };

        if (!email || !password) {
            return reply.code(400).send({ message: 'Missing credentials' });
        }

        const user = await usersRepo.findByEmail(email);
        if (!user) {
            return reply.code(401).send({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return reply.code(401).send({ message: 'Invalid email or password' });
        }

        const token = fastify.jwt.sign({
            id: user._id,
        }, { expiresIn: '7d' });

        user.password = '';
        return reply.setCookie('token', token, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7 // 7 days (in seconds)
        }).code(200).send(user);
    });

    fastify.post('/logout', async (_request, reply) => {
        reply
            .clearCookie('token', {
                path: '/',
                sameSite: 'lax',
                httpOnly: true,
                secure: false // true in production (HTTPS)
            })
            .code(204)
            .send();
    });
};

export default authRoutes;