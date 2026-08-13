import mongoose, { Schema, Document } from 'mongoose';

export interface IGoal extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  targetAmount: number;
  currentAmount: number;
  indicatorColor: string;
  createdAt: Date;
}

const GoalSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  indicatorColor: { type: String, default: "bg-blue-500" },
}, {
  timestamps: true
});

export const Goal = mongoose.model<IGoal>('Goal', GoalSchema);