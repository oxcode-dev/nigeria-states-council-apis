import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

const router = express.Router();

// Router for user registration
router.post('/register', async (req, res) => {
    try {
        const { email, password, first_name, last_name } = req.body;
        const userExists = await User.findOne({ email });

        if(userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            email,
            password: hashedPassword,
            first_name,
            last_name
        })

        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '24h'});

        return res.status(201).json({
            token, 
            message: 'User registered successfully', 
            user: { 
                id: savedUser._id,
                email: savedUser.email, 
                first_name: savedUser.first_name, 
                last_name: savedUser.last_name 
            }
        });

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server error' });
    }
});

// Router for user login
router.post('/login', async (req, res) => {
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

router.delete('/logout', async (req, res) => {
    try {
        // Clearing JWT cookie
        res.cookie("jwt", "", { maxAge: 0 });
        // Sending success response
        res.status(201).json({ message: "Logged out successfully" });
    } catch (error) {
        // Handling errors
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export { router as authRouter };