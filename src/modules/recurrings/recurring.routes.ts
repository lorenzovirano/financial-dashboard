import { FastifyInstance } from 'fastify';
import * as recurringController from './recurring.controller';

export default async function recurringRoutes(fastify: FastifyInstance) {
    fastify.get('/show', recurringController.getAll);
    fastify.post('/create', recurringController.create);
    fastify.put('/:id', recurringController.update);
    fastify.delete('/:id', recurringController.remove);
}