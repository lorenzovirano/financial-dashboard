import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    type: mongoose.Types.ObjectId;
}

const categorySchema = new Schema<ICategory>({
    name: { type: String, required: true, trim: true },
    type: { type: Schema.Types.ObjectId, ref: 'Type', required: true }
});

export const Category = mongoose.model<ICategory>('Category', categorySchema);