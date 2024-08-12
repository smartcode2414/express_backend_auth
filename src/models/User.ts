import mongoose, { Schema, Types } from "mongoose";

interface userType extends Document {
    name: string
    email: string,
    password: string,
    date: Date;
    encrypetPassword: (password: string) => string;
}

const UserSchema: Schema = new Schema<userType>({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
})


export default mongoose.model('User', UserSchema)