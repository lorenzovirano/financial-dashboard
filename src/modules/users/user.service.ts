import mongoose from 'mongoose';
import { User, IUser } from './user.model';
import { Transaction } from '../transactions/transaction.model';
import jwt from 'jsonwebtoken';

// Suggerimento: sposteremo questa chiave nel .env
const JWT_SECRET = process.env.JWT_SECRET || 'ProvaKey'; 

export const registerUser = async (userData: Partial<IUser>) => {
    // Controllo manuale dell'esistenza per evitare l'errore generico di Mongoose
    const existingUser = await User.findOne({ 
        $or: [{ email: userData.email }, { username: userData.username }] 
    });
    
    if (existingUser) {
        throw new Error('Username o Email già in uso');
    }

    const newUser = new User(userData);
    const savedUser = await newUser.save();
    return savedUser;
};

export const loginUser = async (username: string, password: string) => {
    const user = await User.findOne({
        $or: [{ username: username }, { email: username }]
    });

    if (!user) {
        throw new Error('Credenziali non valide');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error('Credenziali non valide');
    }

    // Generiamo il token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
    
    return { user, token };
};

export const getUserDashboard = async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('Utente non trovato');
    const stats = await Transaction.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(userId), cash: { $lt: 0 } } },
        { 
            $group: { 
                _id: "$category", 
                total: { $sum: { $abs: "$cash" } } 
            } 
        },
        {
            $lookup: {
                from: "categories",
                localField: "_id",
                foreignField: "_id",
                as: "categoryDetails"
            }
        }
    ]);

    const resultLabel = stats.map(s => s.categoryDetails[0]?.name || "Altro");
    const resultCash = stats.map(s => s.total);
    const total = resultCash.reduce((a, b) => a + b, 0);

    const transactions = await Transaction.find({ user: userId }).sort({ date: -1 }).limit(10).lean();
    const totalWallet = transactions.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

    const incomeStats = await Transaction.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(userId), cash: { $gt: 0 } } },
        { 
            $group: { 
                _id: { $month: "$date" }, 
                total: { $sum: "$cash" } 
            } 
        },
        { $sort: { "_id": 1 } }
    ]);

    // Mappiamo i mesi (1 = Gennaio, ecc.)
    const months = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
    const incomeLabels = incomeStats.map(s => months[s._id - 1]);
    const incomeData = incomeStats.map(s => s.total);

    return { 
        user, 
        wallet: totalWallet.toFixed(2),
        revenues: {resultLabel, resultCash, total},
        incomeTrend: { labels: incomeLabels, data: incomeData }
    };
};