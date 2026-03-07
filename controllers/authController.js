import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import { auth } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Router for user registration
router.post('/register', async (req, res) => {
    try {
        const { email, password, first_name, last_name } = req.body;

        if(!first_name || !last_name || !email || !password) {
            return res.status(400).json({
                message: "Required fields are missing!",
            })
        }

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
        const refresh_token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d'});

        res.cookie("refreshtoken", refresh_token, {
            httpOnly: true,
            path: "/api/auth/refresh_token",
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000, //validity of 30 days
        });

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

        if(!email || !password) {
            return res.status(400).json({
                message: "Required fields are missing!",
            })
        }

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user?.password)

        if(!user || !isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = { 
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
        }

        const refresh_token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d'});

        res.cookie("refreshtoken", refresh_token, {
            httpOnly: true,
            path: "/api/auth/refresh_token",
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000, //validity of 30 days
        });

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h'},
            (error, token) => {
                if(error) throw error;

                res.status(201).json({
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

router.delete('/logout', auth , async (req, res) => {
    try {
        // Clearing JWT cookie
        res.cookie("refreshtoken", "", { maxAge: 0 });
        // Sending success response
        res.status(201).json({ message: "Logged out successfully" });
    } catch (error) {
        // Handling errors
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/refresh_token', async (req, res) => {
    try {
        res.cookie("refreshtoken", 'refresh_token', {
            httpOnly: true,
            path: "/api/auth/refresh_token",
            sameSite: 'none',
            secure: false,
            maxAge: 30 * 24 * 60 * 60 * 1000, //validity of 30 days
        });

        // const refresh_token = req.cookies?.refreshtoken;
        const refresh_token = await req.cookies?.refreshtoken || 'token'
        return res.status(201).json({ msg: refresh_token})
        
        if (!refresh_token) {
            return res.status(400).json({ msg: "Please login again." });
        }

        jwt.verify(
            refresh_token,
            process.env.JWT_SECRET,
            async (err, result) => {
                if (err) {
                    res.status(401).json({ msg: "Please login again." });
                }

                const user = await User.findById(result.id)
                    .select("-password")
                    .populate("followers following", "-password");

                if (!user) {
                    res.status(400).json({ msg: "User does not exist." });
                }

                const access_token = createAccessToken({ id: result.id });
                res.json({ access_token, user });
            }
        );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
});

export { router as authRouter };