import { FastifyRequest, FastifyReply } from 'fastify';
import * as bankService from './bank.service';

export const createBank = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        // L'Auth Hook globale si occuperà di decodificare il token e popolare request.user.
        // Per ora usiamo un cast "any" per aggirare l'errore di TypeScript finché non lo tipizziamo.
        const user = (request as any).user;
        const userId = user?.id || '60d5ecb54cb919aa1c23a4b5';
        
        const { bankName } = request.body as { bankName: string }; 

        if (!bankName) {
            return reply.code(400).send({ message: 'Il nome della banca è obbligatorio' });
        }

        const result = await bankService.createBank(bankName, userId);
        
        return reply.code(201).send({
            message: "Success",
            data: result
        });
    } catch (error) {
        throw error; 
    }
};

export const getBanks = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const user = (request as any).user;
        const userId = user?.id || '60d5ecb54cb919aa1c23a4b5';
        
        const result = await bankService.getBanksByUser(userId);
        
        if (!result || result.length === 0) {
            return reply.code(404).send({ message: 'Nessuna banca trovata' });
        }

        return reply.code(200).send({
            message: "Success",
            data: result
        });
    } catch (error) {
        throw error;
    }
};