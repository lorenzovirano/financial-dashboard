import mongoose, { Document, Schema } from 'mongoose';

export interface IRecurring extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  frequency: 'weekly' | 'monthly' | 'yearly';
  nextDate: Date;
  account: mongoose.Types.ObjectId;
  category?: mongoose.Types.ObjectId;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const recurringSchema = new Schema<IRecurring>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  frequency: { type: String, enum: ['weekly', 'monthly', 'yearly'], required: true },
  nextDate: { type: Date, required: true },
  account: { type: Schema.Types.ObjectId, ref: 'Bank', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  active: { type: Boolean, default: true }
}, {
  timestamps: true
});

export const Recurring = mongoose.model<IRecurring>('Recurring', recurringSchema);