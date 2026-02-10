import express from 'express';
import { User } from '../models/user.js';
import { generatePin } from '../helpers/index.js';
import { OtpCode } from '../models/otpCode.js';
import { sendMail } from '../helpers/mailer.js';

const router = express.Router();

// Router for user login
router.post('/forgot', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const newOtpCodeDetails = {
            code: generatePin(4),
            email: user.email,
            expires_at: new Date(Date.now() + 15 * 60 * 1000) // OTP expires in 15 minutes
        }

        const otpCode = await OtpCode.create(newOtpCodeDetails);

        await sendMail(
            process.env.EMAIL_SMTP_USERNAME,
            // user.email,
            'mrexcelsam1@gmail.com',
            "Password Reset OTP",
            `<p>Your account with email ${user.email} has been requested for password reset.</p>
            <p>Your OTP is: <b>${otpCode.code}</b></p>
            <p>Thank you for using our application!</p>`
        );

         let data = {
            status: "success",
            message: "Password reset OTP sent successfully! Please check your email.",
        }

        return res.status(201).send(data);
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server error' });
    }
})

export { router as passwordResetRouter };