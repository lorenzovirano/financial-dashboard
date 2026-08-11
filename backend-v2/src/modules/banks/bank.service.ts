import { Bank, IBank } from './bank.model';

export const createBank = async (bankName: string, userId: string) => {
    const newBank = new Bank({
        bankName,
        user: userId
    });

    const result = await newBank.save();
    return result;
};

export const getBanksByUser = async (userId: string) => {
    const result = await Bank.find({ user: userId }).lean();
    return result;
};