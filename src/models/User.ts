import { Schema, model, models } from "mongoose";

export const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already exist!"],
        required: [true, "Email is required!"],
    },
    username: {
        type: String,
        required: [true, 'Username is required!']
    }
})

const User = models.User || model('User', UserSchema)

export default User