import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true, 
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});

export const User = mongoose.model('User', userSchema);