import { FastifyRequest, FastifyReply } from 'fastify';
import * as goalService from './goal.service';

export const createGoal = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const userId = (request as any).user.id;
        const data = request.body as any;
        const goal = await goalService.createGoal(data, userId);
        return reply.code(201).send({ data: goal });
    } catch (error: any) {
        return reply.code(400).send({ message: error.message });
    }
};

export const getGoals = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const userId = (request as any).user.id;
        const goals = await goalService.getGoals(userId);
        return reply.code(200).send({ data: goals });
    } catch (error: any) {
        return reply.code(400).send({ message: error.message });
    }
};

export const addFunds = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const userId = (request as any).user.id;
        const { id } = request.params as { id: string };
        const { amount } = request.body as { amount: number };
        
        const updatedGoal = await goalService.addFunds(id, userId, amount);
        return reply.code(200).send({ data: updatedGoal, message: "Fondi aggiunti con successo" });
    } catch (error: any) {
        return reply.code(400).send({ message: error.message });
    }
};

export const deleteGoal = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const userId = (request as any).user.id;
        const { id } = request.params as { id: string };
        
        await goalService.deleteGoal(id, userId);
        return reply.code(200).send({ message: "Obiettivo eliminato con successo" });
    } catch (error: any) {
        return reply.code(400).send({ message: error.message });
    }
};