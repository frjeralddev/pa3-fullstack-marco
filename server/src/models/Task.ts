import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITask extends Document {
    titulo: string;
    descripcion: string;
    usuario: Types.ObjectId | string; 
}

const taskSchema: Schema = new Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    usuario: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
}, {
    timestamps: true
});

export default mongoose.model<ITask>('Task', taskSchema);