import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

const router = express.Router();

// Router for user login
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        await sendMail(
            process.env.EMAIL_SMTP_USERNAME,
            result.email,
            // 'mrexcelsam1@gmail.com',
            "Account Deletion Notification",
            `<p>Your account with email ${result.email} has been deleted.</p>`
        );
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server error' });
    }
})

export { router as authRouter };