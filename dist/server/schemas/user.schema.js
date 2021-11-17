import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    imageUrl: { type: String },
});
export const UserModel = model('User', userSchema);
//# sourceMappingURL=user.schema.js.map