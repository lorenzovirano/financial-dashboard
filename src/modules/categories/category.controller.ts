import { FastifyRequest, FastifyReply } from 'fastify';
import * as categoryService from './category.service';

export const getTypes = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const types = await categoryService.getAllTypes();
        return reply.code(200).send({ message: "Success", data: types });
    } catch (error: any) {
        throw error;
    }
};

export const getCategories = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        // Estraiamo l'ID direttamente dall'URL (es. /categories/60d5ec...)
        const { typeId } = request.params as { typeId: string };
        
        if (!typeId) {
            return reply.code(400).send({ message: "ID Tipo mancante" });
        }

        const categories = await categoryService.getCategoriesByType(typeId);
        return reply.code(200).send({ message: "Success", data: categories });
    } catch (error: any) {
        throw error;
    }
};