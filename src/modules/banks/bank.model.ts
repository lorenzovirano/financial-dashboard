import mongoose, { Document, Schema } from 'mongoose';

export interface IBank extends Document {
  bankName: string;
  accountType: 'OPERATIVE' | 'INVESTMENT';
  identifier?: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const bankSchema = new Schema<IBank>({
  bankName: {
    type: String,
    required: true,
    trim: true,
  },
  accountType: {
    type: String,
    enum: ['OPERATIVE', 'INVESTMENT'],
    default: 'OPERATIVE',
    required: true
  },
  identifier: {
    type: String,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true
});

export const Bank = mongoose.model<IBank>('Bank', bankSchema);