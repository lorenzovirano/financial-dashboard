import { FastifyInstance } from 'fastify';
import { getUserPortfolio, addInvestment, deleteInvestment } from './investment.controller';

export default async function investmentRoutes(fastify: FastifyInstance) {
  fastify.get('/', getUserPortfolio);
  fastify.post('/', addInvestment);
  fastify.delete('/:id', deleteInvestment);
}