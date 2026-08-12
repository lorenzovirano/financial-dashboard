import { FastifyInstance } from 'fastify';
import * as bankController from './bank.controller';

export default async function bankRoutes(fastify: FastifyInstance) {
    
    fastify.post('/create', bankController.createBank);
    
    fastify.get('/', bankController.getBanks);   
}