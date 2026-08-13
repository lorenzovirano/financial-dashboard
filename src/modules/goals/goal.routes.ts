import { FastifyInstance } from 'fastify';
import * as goalController from './goal.controller';

export default async function goalRoutes(fastify: FastifyInstance) {
    fastify.post('/create', goalController.createGoal);
    fastify.get('/show', goalController.getGoals);
    
    fastify.put('/:id/add-funds', goalController.addFunds);
    
    fastify.delete('/:id', goalController.deleteGoal);
}