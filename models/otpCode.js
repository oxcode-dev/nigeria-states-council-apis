import mongoose from "mongoose";

const otpCodeSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    code: {
        type: String,
        required: true,
        length: 4,
    },
    expires_at: {
        type: Date,
        required: true,
    },
}, {timestamps: true});

export const OtpCode = mongoose.model('OtpCode', otpCodeSchema);