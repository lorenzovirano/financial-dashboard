import mongoose, { Schema, Document } from 'mongoose';

export interface IMarketPrice extends Document {
  symbol: string;
  currentPrice: number;
  lastUpdated: Date;
}

const marketPriceSchema = new Schema<IMarketPrice>({
  symbol: { type: String, required: true, unique: true, uppercase: true },
  currentPrice: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model<IMarketPrice>('MarketPrice', marketPriceSchema);