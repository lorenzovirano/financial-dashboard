import { Goal } from './goal.model';
import { Transaction } from '../transactions/transaction.model';

export const createGoal = async (data: { title: string; targetAmount: number; indicatorColor: string }, userId: string) => {
    const newGoal = new Goal({
        ...data,
        currentAmount: 0,
        user: userId
    });
    return await newGoal.save();
};

export const getGoals = async (userId: string) => {
    return await Goal.find({ user: userId }).sort({ createdAt: 'desc' }).lean();
};

export const addFunds = async (goalId: string, userId: string, amount: number) => {
    const transactions = await Transaction.find({ user: userId });
    const totalBalance = transactions.reduce((acc, tx) => acc + tx.amount, 0);
    
    const allGoals = await Goal.find({ user: userId });
    const allocatedFunds = allGoals.reduce((acc, goal) => acc + goal.currentAmount, 0);
    
    const freeBalance = totalBalance - allocatedFunds;
    
    if (amount > freeBalance) {
        throw new Error(`Fondi insufficienti. Hai solo €${freeBalance.toFixed(2)} disponibili da poter allocare.`);
    }
    
    const goal = await Goal.findOne({ _id: goalId, user: userId });
    
    if (!goal) {
        throw new Error("Obiettivo non trovato o non autorizzato");
    }
    
    goal.currentAmount += amount;
    
    if (goal.currentAmount > goal.targetAmount) {
        goal.currentAmount = goal.targetAmount;
    }
    
    return await goal.save();
};

export const deleteGoal = async (goalId: string, userId: string) => {
    const deleted = await Goal.findOneAndDelete({ _id: goalId, user: userId });
    if (!deleted) {
        throw new Error("Obiettivo non trovato o non autorizzato");
    }
    return deleted;
};