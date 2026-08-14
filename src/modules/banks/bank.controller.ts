import { FastifyRequest, FastifyReply } from 'fastify';
import * as bankService from './bank.service';

export const createBank = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const userId = (request as any).user?.id || '60d5ecb54cb919aa1c23a4b5';
        const data = request.body as any;

        if (!data.bankName) {
            return reply.code(400).send({ message: 'Il nome della banca è obbligatorio' });
        }

        const result = await bankService.createBank(data, userId);
        return reply.code(201).send({ message: "Success", data: result });
    } catch (error: any) {
        return reply.code(400).send({ message: error.message });
    }
};

export const getBanks = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const userId = (request as any).user?.id || '60d5ecb54cb919aa1c23a4b5';
        const result = await bankService.getBanksByUser(userId);
        return reply.code(200).send({ message: "Success", data: result });
    } catch (error: any) {
        return reply.code(400).send({ message: error.message });
    }
};

export const updateBank = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const userId = (request as any).user?.id || '60d5ecb54cb919aa1c23a4b5';
        const { id } = request.params as { id: string };
        const data = request.body as any;
        
        const result = await bankService.updateBank(id, userId, data);
        return reply.code(200).send({ message: "Success", data: result });
    } catch (error: any) {
        return reply.code(400).send({ message: error.message });
    }
};

export const deleteBank = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const userId = (request as any).user?.id || '60d5ecb54cb919aa1c23a4b5';
        const { id } = request.params as { id: string };
        
        await bankService.deleteBank(id, userId);
        return reply.code(200).send({ message: "Conto eliminato" });
    } catch (error: any) {
        return reply.code(400).send({ message: error.message });
    }
};