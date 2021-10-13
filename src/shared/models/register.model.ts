import * as mongoose from 'mongoose';
export interface Register {
    _id?:{type: mongoose.Types.ObjectId}
    fname: string | number | null,
    lname: string,
    email: string,
    avatar: string,
    password?: string,
}