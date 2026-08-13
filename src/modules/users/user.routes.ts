import { FastifyInstance } from 'fastify';
import '@fastify/jwt';
import * as userController from './user.controller';

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.post('/register', userController.register);
    fastify.post('/login', userController.login);
    fastify.get('/profile', userController.getProfile);
}