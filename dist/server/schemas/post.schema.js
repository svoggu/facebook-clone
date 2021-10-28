import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const postSchema = new mongoose.Schema({
    // title: {type: String, required: true},
    message: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId }
});
export const PostModel = mongoose.model('Post', postSchema);
//# sourceMappingURL=post.schema.js.map