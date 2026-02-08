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

        let data = {
            status: "success",
            message: "Profile retrieved successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                isAdmin: user.isAdmin,
                first_name: user.first_name,
                last_name: user.last_name,
            },
        }
        // Access the logged-in user's data via req.user
        res.status(200).json(data);
    } catch(error) {
        return res.status(500).json({ message: 'server error'})
    }
})

router.put('/', auth, async (req, res) => {
    try {
        const auth = req.user
        const user = await User.findById(auth.id)

        if(!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const { first_name, last_name, email } = req.body;

        if(
            !first_name || !last_name || !email
        ) {
            return res.status(400).json({
                message: "Required fields are missing!",
            })
        }

        if(first_name) user.first_name = first_name;
        if(last_name) user.last_name = last_name;
        if(email) user.email = email;

        await user.save();

        let data = {
            status: "success",
            message: "Profile updated successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                isAdmin: user.isAdmin,
                first_name: user.first_name,
                last_name: user.last_name,
            },
        };
        res.status(200).json(data);
    } catch(error) {
        return res.status(500).json({ message: 'server error'})
    }
})

export { router as profileRouter };