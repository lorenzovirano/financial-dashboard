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

export const createTransaction = async (data: any, userId: string) => {
    let finalAmount = Number(data.amount);
    if (data.type === 'expense' && finalAmount > 0) {
        finalAmount = -finalAmount;
    } 
    else if ((data.type === 'income' || data.type === 'transfer') && finalAmount < 0) {
        finalAmount = Math.abs(finalAmount);
    }
    if (data.type === 'transfer') {
        if (!data.toAccount) {
            throw new Error("Un trasferimento richiede un conto di destinazione.");
        }
        if (data.account === data.toAccount) {
            throw new Error("Il conto di destinazione deve essere diverso da quello di origine.");
        }

        const accountTransactions = await Transaction.find({
            user: userId,
            $or: [{ account: data.account }, { toAccount: data.account }]
        });
        const currentBalance = accountTransactions.reduce((acc, tx) => {
            const txAmount = Number(tx.amount);
            
            if (tx.type === 'income' && tx.account.toString() === data.account) return acc + txAmount;
            if (tx.type === 'expense' && tx.account.toString() === data.account) return acc + txAmount; 
            if (tx.type === 'transfer') {
                if (tx.account.toString() === data.account) return acc - txAmount;
                if (tx.toAccount?.toString() === data.account) return acc + txAmount;
            }
            return acc;
        }, 0);
        if (currentBalance < finalAmount) {
            throw new Error(`Fondi insufficienti. Saldo disponibile: € ${currentBalance.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
        }
    }

    const newTransaction = new Transaction({
        ...data,
        amount: finalAmount,
        user: userId
    });

    return await newTransaction.save();
};

export const getTransactions = async (userId: string, limit?: number, type?: 'positive' | 'negative') => {
    const query: any = { user: userId };
    
    if (type === 'positive') query.amount = { $gt: 0 };
    if (type === 'negative') query.amount = { $lt: 0 };

    let dbQuery = Transaction.find(query)
        .populate('category')
        .populate('account', 'bankName accountType')
        .populate('toAccount', 'bankName accountType')
        .sort({ date: 'desc' })
        .lean();
    
    if (limit) {
        dbQuery = dbQuery.limit(limit);
    }

    const transactions = await dbQuery;
    return transactions;
};

export const getTransactionsByUser = async (userId: string) => {
    return await Transaction.find({ user: userId })
        .populate('category')
        .populate('account', 'bankName accountType') 
        .populate('toAccount', 'bankName accountType')
        .sort({ date: 'desc' })
        .lean();
};

export const deleteTransaction = async (transactionId: string, userId: string) => {
    const deleted = await Transaction.findOneAndDelete({ _id: transactionId, user: userId });
    if (!deleted) {
        throw new Error("Transazione non trovata o non autorizzato");
    }
    return deleted;
};