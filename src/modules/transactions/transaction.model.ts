import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  user: mongoose.Types.ObjectId;
  amount: number;
  type: 'income' | 'expense';
  category: mongoose.Types.ObjectId;
  date: Date;
  description?: string;
  createdAt: Date;
}

const TransactionSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  date: { type: Date, default: Date.now, required: true },
  description: { type: String, trim: true },
}, {
  timestamps: true
});

export const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);