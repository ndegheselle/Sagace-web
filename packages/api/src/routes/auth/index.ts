import type { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { usersRepo } from '@/models/UsersRepository';
import bcrypt from 'bcrypt';

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
            id: user._id
        });

        return reply.send({ token });
    })
};

export default authRoutes;