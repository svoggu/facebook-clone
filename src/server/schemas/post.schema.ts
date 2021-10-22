import mongoose from 'mongoose';
import type { Post } from '../../shared/models/post.model';
const {Schema, model} = mongoose;

const postSchema = new mongoose.Schema<Post>({
    // title: {type: String, required: true},
    message: {type: String, required: true},
    user: {type: mongoose.Types.ObjectId}
})

export const PostModel = mongoose.model<Post>('Post', postSchema); 