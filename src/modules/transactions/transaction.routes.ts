import { FastifyInstance } from 'fastify';
import * as transactionController from './transaction.controller';

export default async function transactionRoutes(fastify: FastifyInstance) {
    fastify.post('/create', transactionController.createTransaction);
    fastify.post('/import', transactionController.importCSV);
    
    fastify.get('/show', transactionController.getAll);
    fastify.get('/show-positive', transactionController.getPositive);
    fastify.get('/show-negative', transactionController.getNegative);
    
    // Le rotte per /types e /categories andrebbero idealmente spostate in moduli dedicati (es. TypeModule),
    // ma le omettiamo qui in attesa di ristrutturare quei modelli.
}