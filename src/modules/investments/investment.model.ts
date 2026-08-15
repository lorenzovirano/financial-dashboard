import mongoose, { Schema, Document } from 'mongoose';

export interface IInvestment extends Document {
  user: mongoose.Types.ObjectId;
  bank: mongoose.Types.ObjectId;
  symbol: string;
  type: 'crypto' | 'stock' | 'etf';
  quantity: number;
  averageBuyPrice: number;
  currency: string;
}

const investmentSchema = new Schema<IInvestment>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bank: { type: Schema.Types.ObjectId, ref: 'Bank', required: true }, 
  symbol: { type: String, required: true, uppercase: true },
  type: { type: String, enum: ['crypto', 'stock', 'etf'], required: true },
  quantity: { type: Number, required: true, min: 0 },
  averageBuyPrice: { type: Number, required: true, min: 0 },
  currency: { type: String, default: 'EUR' }
}, { 
  timestamps: true 
});

investmentSchema.index({ user: 1, symbol: 1, bank: 1 }, { unique: true });

export default mongoose.model<IInvestment>('Investment', investmentSchema);