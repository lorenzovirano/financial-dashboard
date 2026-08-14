import { Recurring } from './recurring.model';

export const createRecurring = async (data: any, userId: string) => {
    const normalizedAmount = Math.abs(Number(data.amount));

    const newRecurring = new Recurring({
        ...data,
        amount: normalizedAmount,
        user: userId
    });

    return await newRecurring.save();
};

export const getRecurringByUser = async (userId: string) => {
    return await Recurring.find({ user: userId })
        .populate('account', 'bankName accountType')
        .populate('category', 'name icon color')
        .sort({ nextDate: 'asc' })
        .lean();
};

export const updateRecurring = async (id: string, userId: string, data: any) => {
    if (data.amount) {
        data.amount = Math.abs(Number(data.amount));
    }

    const updated = await Recurring.findOneAndUpdate(
        { _id: id, user: userId },
        { $set: data },
        { new: true }
    );

    if (!updated) {
        throw new Error("Abbonamento non trovato o non autorizzato");
    }
    return updated;
};

export const deleteRecurring = async (id: string, userId: string) => {
    const deleted = await Recurring.findOneAndDelete({ _id: id, user: userId });
    
    if (!deleted) {
        throw new Error("Abbonamento non trovato o non autorizzato");
    }
    return deleted;
};