import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'ProvaKey';

export const verifyToken = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return reply.code(401).send({ message: 'Token mancante' });
        }

        const decoded = jwt.verify(authHeader, JWT_SECRET);
        (request as any).user = decoded;
    } catch (err) {
        return reply.code(403).send({ message: 'Token non valido o scaduto' });
    }
};