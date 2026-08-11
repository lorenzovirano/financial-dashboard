import { Transaction, ITransaction } from './transaction.model';
import csv from 'csvtojson';

export const importTransactions = async (csvString: string, userId: string) => {
    const parsedData = await csv().fromString(csvString);
    
    if (parsedData.length === 0) {
        throw new Error("Il file CSV è vuoto");
    }

    // Mappiamo i dati per il DB, assicurandoci di castare il cash a Number
    const transactionsToInsert = parsedData.map(row => ({
        type: row.type,
        category: row.category || null,
        description: row.description,
        cash: parseFloat(row.cash),
        date: new Date(row.date),
        user: userId
    }));

    // Batch insert: 1 singola query ottimizzata invece di N query in un ciclo
    const result = await Transaction.insertMany(transactionsToInsert);
    return result;
};

export const createTransaction = async (data: Partial<ITransaction>, userId: string) => {
    const newTransaction = new Transaction({
        ...data,
        cash: Number(data.cash),
        user: userId
    });
    return await newTransaction.save();
};

export const getTransactions = async (userId: string, limit?: number, type?: 'positive' | 'negative') => {
    const query: any = { user: userId };
    
    // Ora che cash è un numero, le query $gt e $lt funzionano perfettamente
    if (type === 'positive') query.cash = { $gt: 0 };
    if (type === 'negative') query.cash = { $lt: 0 };

    let dbQuery = Transaction.find(query).sort({ createdAt: 'desc' }).lean();
    
    if (limit) {
        dbQuery = dbQuery.limit(limit);
    }

    const transactions = await dbQuery;

    // Formattiamo le date prima di inviarle al client
    return transactions.map(trans => ({
        ...trans,
        date: trans.date.toLocaleString() // Modificabile in base alla localizzazione desiderata
    }));
};