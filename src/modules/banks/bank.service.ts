import { Bank } from './bank.model';

export const createBank = async (data: { bankName: string, accountType: string, identifier?: string }, userId: string) => {
    const newBank = new Bank({
        ...data,
        user: userId
    });
    return await newBank.save();
};

export const getBanksByUser = async (userId: string) => {
    return await Bank.find({ user: userId }).sort({ createdAt: 'asc' }).lean();
};

export const updateBank = async (bankId: string, userId: string, data: { bankName: string, accountType: string, identifier?: string }) => {
    const updated = await Bank.findOneAndUpdate(
        { _id: bankId, user: userId },
        { $set: data },
        { new: true }
    );
    if (!updated) throw new Error("Conto non trovato o non autorizzato");
    return updated;
};

export const deleteBank = async (bankId: string, userId: string) => {
    const deleted = await Bank.findOneAndDelete({ _id: bankId, user: userId });
    if (!deleted) throw new Error("Conto non trovato o non autorizzato");
    return deleted;
};