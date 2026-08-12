import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
    type: mongoose.Types.ObjectId;
    category: mongoose.Types.ObjectId;
    description: string;
    cash: number; // Tassativamente un numero!
    date: Date;
    user: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const transactionSchema = new Schema<ITransaction>({
    type: { type: Schema.Types.ObjectId, ref: 'Type' },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    description: { type: String, required: true, trim: true },
    cash: { type: Number, required: true },
    date: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true
});

export const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);