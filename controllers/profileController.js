import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Access the logged-in user's data via req.user
        res.status(200).json({
            message: `Welcome, ${req.user}!`,
            user: req.user
        });
        // return res.status(200).json({ message: 'my details' })
    } catch(error) {
        return res.status(500).json({ message: 'server error'})
    }
})

export { router as profileRouter };