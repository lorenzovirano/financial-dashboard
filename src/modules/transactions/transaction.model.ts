import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
  user: mongoose.Types.ObjectId;
  amount: number; 
  type: 'income' | 'expense' | 'transfer';
  account: mongoose.Types.ObjectId;
  toAccount?: mongoose.Types.ObjectId;
  category?: mongoose.Types.ObjectId;
  date: Date;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new Schema<ITransaction>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { 
    type: String, 
    enum: ['income', 'expense', 'transfer'], 
    required: true 
  },
  account: { type: Schema.Types.ObjectId, ref: 'Bank', required: true },
  toAccount: { type: Schema.Types.ObjectId, ref: 'Bank' },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  date: { type: Date, default: Date.now, required: true },
  description: { type: String, trim: true }
}, {
  timestamps: true
});

export const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);