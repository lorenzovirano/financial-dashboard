import { FastifyRequest, FastifyReply } from 'fastify';
import * as categoryService from './category.service';

interface CreateCategoryBody {
    name: string;
    typeId: string;
}

interface UpdateCategoryBody {
    name: string;
}


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
        const { typeId } = request.params as { typeId: string };
        const userId = (request.user as any).id; 
        
        if (!typeId) {
            return reply.code(400).send({ message: "ID Tipo mancante" });
        }
        const categories = await categoryService.getCategoriesByType(typeId, userId);
        return reply.code(200).send({ message: "Success", data: categories });
    } catch (error: any) {
        throw error;
    }
};

export const createCategory = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { name, typeId } = request.body as CreateCategoryBody;
        const userId = (request.user as any).id;

        if (!name || !typeId) {
            return reply.code(400).send({ message: "Nome e Tipo sono obbligatori" });
        }

        const newCategory = await categoryService.createCategory(name, typeId, userId);
        return reply.code(201).send({ message: "Categoria creata", data: newCategory });
    } catch (error: any) {
        throw error;
    }
};

export const updateCategory = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = request.params as { id: string };
        const { name } = request.body as UpdateCategoryBody;
        const userId = (request.user as any).id;

        if (!name) {
            return reply.code(400).send({ message: "Il nome è obbligatorio" });
        }

        const updated = await categoryService.updateCategory(id, name, userId);
        return reply.code(200).send({ message: "Categoria aggiornata", data: updated });
    } catch (error: any) {
        return reply.code(403).send({ message: error.message || "Errore durante la modifica" });
    }
};

export const removeCategory = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = request.params as { id: string };
        const userId = (request.user as any).id;

        await categoryService.deleteCategory(id, userId);
        return reply.code(200).send({ message: "Categoria eliminata con successo" });
    } catch (error: any) {
        return reply.code(403).send({ message: error.message || "Errore durante l'eliminazione" });
    }
};