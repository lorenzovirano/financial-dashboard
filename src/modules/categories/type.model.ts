import mongoose, { Document, Schema } from 'mongoose';

export interface IType extends Document {
    name: string;
}

const typeSchema = new Schema<IType>({
    name: { type: String, required: true, trim: true }
});

export const Type = mongoose.model<IType>('Type', typeSchema);