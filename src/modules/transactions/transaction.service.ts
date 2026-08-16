import { Transaction } from './transaction.model';
import { Category } from '../categories/category.model'; // Adegua il path se necessario

export const bulkImportTransactions = async (transactions: any[], accountId: string, userId: string) => {
    if (!transactions || transactions.length === 0) {
        throw new Error("Nessuna transazione fornita per l'importazione.");
    }
    if (!accountId) {
        throw new Error("Devi specificare un conto di destinazione (account).");
    }
    const uniqueCategoryNames = [...new Set(
        transactions
            .map(tx => tx.category)
            .filter(cat => cat && typeof cat === 'string' && cat.trim() !== '')
    )] as string[];

    const categoryNameToIdMap = new Map<string, string>();

    if (uniqueCategoryNames.length > 0) {
        const existingCategories = await Category.find({
            $or: [{ user: userId }, { user: { $exists: false } }, { user: null }], 
            name: { $in: uniqueCategoryNames.map(name => new RegExp(`^${name.trim()}$`, 'i')) }
        });
        existingCategories.forEach(cat => {
            categoryNameToIdMap.set(cat.name.toLowerCase(), cat._id.toString());
        });
    }

    const transactionsToInsert = transactions.map(tx => {
        let categoryId = null;
        
        if (tx.category && typeof tx.category === 'string' && tx.category.trim() !== '') {
            categoryId = categoryNameToIdMap.get(tx.category.trim().toLowerCase()) || null;
        }

        return {
            type: tx.type,
            category: categoryId,
            description: tx.description,
            amount: Number(tx.amount),
            date: new Date(tx.date),
            account: accountId,
            user: userId
        };
    });

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