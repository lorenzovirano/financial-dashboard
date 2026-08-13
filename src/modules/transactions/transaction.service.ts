import { Transaction, ITransaction } from './transaction.model';
import csv from 'csvtojson';

export const importTransactions = async (csvString: string, userId: string) => {
    const parsedData = await csv().fromString(csvString);
    
    if (parsedData.length === 0) {
        throw new Error("Il file CSV è vuoto");
    }

    const transactionsToInsert = parsedData.map(row => ({
        type: row.type,
        category: row.category || null,
        description: row.description,
        amount: parseFloat(row.amount),
        date: new Date(row.date),
        user: userId
    }));

    const result = await Transaction.insertMany(transactionsToInsert);
    return result;
};

export const createTransaction = async (data: Partial<ITransaction>, userId: string) => {
    const newTransaction = new Transaction({
        ...data,
        amount: Number(data.amount),
        user: userId
    });
    return await newTransaction.save();
};

export const getTransactions = async (userId: string, limit?: number, type?: 'positive' | 'negative') => {
    const query: any = { user: userId };
    
    if (type === 'positive') query.amount = { $gt: 0 };
    if (type === 'negative') query.amount = { $lt: 0 };

    let dbQuery = Transaction.find(query).populate('category').sort({ createdAt: 'desc' }).lean();
    
    if (limit) {
        dbQuery = dbQuery.limit(limit);
    }

    const transactions = await dbQuery;

    return transactions.map(trans => ({
        ...trans,
        date: trans.date.toLocaleString() 
    }));
};

export const deleteTransaction = async (transactionId: string, userId: string) => {
    const deleted = await Transaction.findOneAndDelete({ _id: transactionId, user: userId });
    if (!deleted) {
        throw new Error("Transazione non trovata o non autorizzato");
    }
    return deleted;
};