import mongoose from 'mongoose';
import type { User } from '../../shared/models/user.model';
const {Schema, model} = mongoose

const userSchema = new Schema<User>({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    imageUrl: {type:String},
});

export const UserModel = model<User>('User',userSchema)
