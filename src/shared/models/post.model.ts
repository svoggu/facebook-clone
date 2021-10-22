import * as mongoose from 'mongoose';
import type { User } from './user.model';
export interface Post {
    // title: string;
    message: string;
    user: {type: mongoose.Types.ObjectId} | User;
}