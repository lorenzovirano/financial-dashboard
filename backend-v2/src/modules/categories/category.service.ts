import { Type } from './type.model';
import { Category } from './category.model';

export const getAllTypes = async () => {
    // .lean() per massimizzare le performance di lettura
    return await Type.find().lean();
};

export const getCategoriesByType = async (typeId: string) => {
    return await Category.find({ type: typeId }).lean();
};

// Funzione Bonus (Opzionale): Un seeder per popolare il DB la prima volta
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