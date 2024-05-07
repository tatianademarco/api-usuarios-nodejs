import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    nome: string;
    email: string;
    idade: number;
    genero: string;
    telefone: string;
    cpf: string;
    rg: string;
}

const UserSchema: Schema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    idade: { type: Number, required: true },
    genero: { type: String, required: true },
    telefone: { type: String, required: true },
    cpf: { type: String, required: true },
    rg: { type: String, required: true }
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
