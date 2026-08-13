import { FastifyRequest, FastifyReply } from 'fastify';
import * as userService from './user.service';

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const body = request.body as any;
        
        if (!body.username || !body.password || !body.email) {
            return reply.code(400).send({ message: "Username, email e password sono obbligatori" });
        }

        const result = await userService.registerUser(body);
        
        return reply.code(201).send({
            message: "Success",
            data: result
        });
    } catch (error: any) {
        return reply.code(400).send({ message: error.message });
    }
};

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { username, password } = request.body as any;
        const result = await userService.loginUser(username, password);

        return reply.code(200).send({
            message: "Success",
            token: result.token,
            data: result.user
        });
    } catch (error: any) {
        return reply.code(401).send({ message: error.message });
    }
};

export const getProfile = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const userId = (request as any).user.id;
        
        const dashboardData = await userService.getUserDashboard(userId);
        
        return reply.code(200).send({
            message: "Success",
            ...dashboardData
        });
    } catch (error: any) {
        return reply.code(400).send({ message: error.message });
    }
};