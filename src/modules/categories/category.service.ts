import { Type } from './type.model';
import { Category } from './category.model';

export const getAllTypes = async () => {
    return await Type.find().lean();
};

export const getCategoriesByType = async (typeId: string, userId: string) => {
    return await Category.find({ 
        type: typeId,
        $or: [
            { user: userId },
            { user: { $exists: false } },
            { user: null }         
        ]
    }).lean();
};

export const createCategory = async (name: string, typeId: string, userId: string) => {
    return await Category.create({ 
        name, 
        type: typeId, 
        user: userId 
    });
};

export const updateCategory = async (categoryId: string, name: string, userId: string) => {
    const category = await Category.findOne({ _id: categoryId, user: userId });
    if (!category) {
        throw new Error("Categoria non trovata o non autorizzato alla modifica");
    }
    category.name = name;
    await category.save();
    return category;
};

export const deleteCategory = async (categoryId: string, userId: string) => {
    const deleted = await Category.findOneAndDelete({ _id: categoryId, user: userId });
    if (!deleted) {
        throw new Error("Categoria non trovata o non autorizzato all'eliminazione");
    }
    return deleted;
};

export const seedInitialData = async () => {
    const typesCount = await Type.countDocuments();
    if (typesCount === 0) {
        const entrata = await Type.create({ name: 'Entrata' });
        const uscita = await Type.create({ name: 'Uscita' });

        await Category.insertMany([
            { name: 'Stipendio', type: entrata._id },
            { name: 'Vendite', type: entrata._id },
            { name: 'Moto', type: uscita._id },
            { name: 'Spesa Alimentare', type: uscita._id },
            { name: 'Svago', type: uscita._id }
        ]);
        console.log('✅ Tipi e Categorie iniziali creati con successo!');
    }
};