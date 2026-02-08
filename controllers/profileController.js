import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const auth = req.user
        const user = await User.findById(auth.id).select('-password')
        // Access the logged-in user's data via req.user
        res.status(200).json({
            message: `Welcome, ${user.fullName}!`,
            user: user
        });
    } catch(error) {
        return res.status(500).json({ message: 'server error'})
    }
})

export { router as profileRouter };