import { FastifyRequest, FastifyReply } from 'fastify';
import * as transactionService from './transaction.service';

export const bulkImport = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const userId = (request as any).user.id;
        
        // Ora leggiamo dal body, non più dal file multipart
        const { transactions, account } = request.body as { transactions: any[], account: string };

        if (!transactions || !account) {
            return reply.code(400).send({ message: "Transazioni e conto di origine sono obbligatori." });
        }

        const result = await transactionService.bulkImportTransactions(transactions, account, userId);
        
        return reply.code(201).send({ message: "Success", data: result });
    } catch (error: any) {
        return reply.code(500).send({ message: error.message });
    }
};

export const createTransaction = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const userId = (request as any).user.id;
        const data = request.body as any;
        
        if (data.amount === undefined || !data.type || !data.account) {
            return reply.code(400).send({ message: "Importo, tipologia e conto di origine sono obbligatori." });
        }

        if (data.type !== 'transfer' && !data.category) {
            return reply.code(400).send({ message: "La categoria è obbligatoria per entrate e uscite." });
        }

        const result = await transactionService.createTransaction(data, userId);
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

export const deleteTransaction = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const userId = (request as any).user.id;
        const { id } = request.params as { id: string };
        
        await transactionService.deleteTransaction(id, userId);
        return reply.code(200).send({ message: "Transazione eliminata con successo" });
    } catch (error: any) {
        return reply.code(400).send({ message: error.message });
    }
};