import * as mongoose from 'mongoose';
export interface User {
    _id?:{type: mongoose.Types.ObjectId}
    firstname: string,
    lastname: string,
    email: string,
    password?: string,
}