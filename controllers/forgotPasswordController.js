import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

const router = express.Router();

// Router for user login
router.post('/forgot-password', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch = await bcrypt.compare(password, user.password)

        if(!user || !isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = { 
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
        }
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600*24},
            (error, token) => {
                if(error) throw error;

                res.json({
                    token,
                    user: {
                        id: user._id,
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name
                    },
                    message: 'Login successful'
                })
            }
        );
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server error' });
    }
})

export { router as authRouter };