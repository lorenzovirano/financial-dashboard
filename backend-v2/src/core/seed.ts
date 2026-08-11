import { Type } from '../modules/categories/type.model';
import { Category } from '../modules/categories/category.model';

export const seedDatabase = async () => {
    try {
        await Type.deleteMany({});
        await Category.deleteMany({});

        const entrata = await Type.create({ name: 'Entrata' });
        const uscita = await Type.create({ name: 'Uscita' });

        await Category.insertMany([
            { name: 'Stipendio', type: entrata._id },
            { name: 'Freelance / Extra', type: entrata._id },
            { name: 'Altro (Entrata)', type: entrata._id },
            
            { name: 'Casa & Utenze', type: uscita._id },
            { name: 'Spesa Alimentare', type: uscita._id },
            { name: 'Trasporti / Moto', type: uscita._id },
            { name: 'Svago & Ristoranti', type: uscita._id },
            { name: 'Altro (Uscita)', type: uscita._id }
        ]);

        console.log('✅ Database popolato e sincronizzato con successo!');
    } catch (error) {
        console.error('❌ Errore durante il seed del database:', error);
    }
};