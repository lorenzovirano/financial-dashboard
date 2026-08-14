import { FastifyRequest, FastifyReply } from 'fastify';
import * as recurringService from './recurring.service';

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const userId = (request.user as any).id; 
        const data = request.body;
        
        const newRecurring = await recurringService.createRecurring(data, userId);
        
        return reply.code(201).send({
            status: 'success',
            data: newRecurring
        });
    } catch (error: any) {
        return reply.code(400).send({
            status: 'error',
            message: error.message
        });
    }
};

export const getAll = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const userId = (request.user as any).id;
        
        const recurring = await recurringService.getRecurringByUser(userId);
        
        return reply.code(200).send({
            status: 'success',
            data: recurring
        });
    } catch (error: any) {
        return reply.code(500).send({
            status: 'error',
            message: error.message
        });
    }
};

export const update = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
        const userId = (request.user as any).id;
        const { id } = request.params;
        const data = request.body;
        
        const updatedRecurring = await recurringService.updateRecurring(id, userId, data);
        
        return reply.code(200).send({
            status: 'success',
            data: updatedRecurring
        });
    } catch (error: any) {
        return reply.code(400).send({
            status: 'error',
            message: error.message
        });
    }
};

export const remove = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
        const userId = (request.user as any).id;
        const { id } = request.params;
        
        const deletedRecurring = await recurringService.deleteRecurring(id, userId);
        
        return reply.code(200).send({
            status: 'success',
            data: deletedRecurring
        });
    } catch (error: any) {
        return reply.code(400).send({
            status: 'error',
            message: error.message
        });
    }
};