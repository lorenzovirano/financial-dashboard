import { FastifyInstance } from 'fastify';
import * as categoryController from './category.controller';

export default async function categoryRoutes(fastify: FastifyInstance) {
    fastify.get('/types', categoryController.getTypes);
    fastify.get('/:typeId', categoryController.getCategories);
}