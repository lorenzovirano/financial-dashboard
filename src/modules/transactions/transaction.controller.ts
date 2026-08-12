import { FastifyRequest, FastifyReply } from 'fastify';
import * as transactionService from './transaction.service';

export const importCSV = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const userId = (request as any).user.id;
        
        // Fastify Multipart: estrae il file in modo asincrono
        const data = await request.file();
        if (!data) {
            return reply.code(400).send({ message: "File CSV mancante" });
        }

        const buffer = await data.toBuffer();
        const result = await transactionService.importTransactions(buffer.toString(), userId);
        
        return reply.code(201).send({ message: "Success", data: result });
    } catch (error: any) {
        return reply.code(500).send({ message: error.message });
    }
};

export const createTransaction = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const userId = (request as any).user.id;
        const body = request.body as any;
        
        const result = await transactionService.createTransaction(body, userId);
        return reply.code(201).send({ message: "Success", data: result });
    } catch (error: any) {
        return reply.code(400).send({ message: error.message });
    }
};

export const getAll = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const userId = (request as any).user.id;
        const { limit } = request.query as { limit?: number };
        
        const result = await transactionService.getTransactions(userId, limit ? Number(limit) : undefined);
        return reply.code(200).send({ message: "Success", data: result });
    } catch (error: any) {
        throw error;
    }
};

export const getPositive = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const userId = (request as any).user.id;
        const result = await transactionService.getTransactions(userId, undefined, 'positive');
        return reply.code(200).send({ message: "Success", data: result });
    } catch (error: any) {
        throw error;
    }
};

export const getNegative = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const userId = (request as any).user.id;
        const result = await transactionService.getTransactions(userId, undefined, 'negative');
        return reply.code(200).send({ message: "Success", data: result });
    } catch (error: any) {
        throw error;
    }
};