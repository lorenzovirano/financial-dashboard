import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import mongoose from 'mongoose';
import fastifyMultipart from '@fastify/multipart';
import { verifyToken } from './core/auth';
import { seedDatabase } from './core/seed';

import userRoutes from './modules/users/user.routes';
import transactionRoutes from './modules/transactions/transaction.routes';
import bankRoutes from './modules/banks/bank.routes';
import categoryRoutes from './modules/categories/category.routes';

const startServer = async () => {
  const fastify = Fastify({
    logger: true, 
  });

  try {
    await fastify.register(cors, {
      origin: '*', 
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // <-- Aggiungi i metodi consentiti
      allowedHeaders: ['Content-Type', 'Authorization'],    // <-- Buona norma per i token JWT
    });
    // 3. Connessione a MongoDB
    const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/financial-dashboard';
    await mongoose.connect(dbUri);
    fastify.log.info('🚀 Connessione al Database stabilita con successo');
    await seedDatabase();

    await fastify.register(fastifyMultipart);

    // 4. Hook di Autenticazione Antiproiettile
    fastify.addHook('onRequest', async (request, reply) => {
      const path = request.url.split('?')[0]; 
      
      const isPublicRoute = 
        path === '/users/login' || 
        path === '/users/register' || 
        path === '/ping';

      if (isPublicRoute) {
        return;
      }
      
      await verifyToken(request, reply);
    });

    // 5. Error Handler Globale Unificato
    fastify.setErrorHandler((error, request, reply) => {
        fastify.log.error(error);

        if (error.validation) {
            return reply.status(400).send({ 
                message: "Errore di validazione della richiesta", 
                details: error.validation 
            });
        }

        if (error.name === 'ValidationError') {
            return reply.status(400).send({ message: error.message });
        }

        if (error.statusCode === 401 || error.statusCode === 403) {
            return reply.status(error.statusCode).send({ message: error.message });
        }

        const statusCode = error.statusCode || 500;
        return reply.status(statusCode).send({ 
            message: error.message || "Errore interno del server" 
        });
    });

    // 6. Registrazione di TUTTE le Rotte
    await fastify.register(userRoutes, { prefix: '/users' });
    await fastify.register(transactionRoutes, { prefix: '/transaction' });
    await fastify.register(bankRoutes, { prefix: '/bank' });
    await fastify.register(categoryRoutes, { prefix: '/categories' });

    // Rotta di test
    fastify.get('/ping', async () => {
      return { status: 'online', message: 'Il refactoring sta funzionando!' };
    });

    // 7. Avvio del Server
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
    
    console.log(fastify.printRoutes());

    await fastify.listen({ port, host: '0.0.0.0' });
    
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer();