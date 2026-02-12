import express from "express"
import { User } from "../models/user.js";
import { generatePassword } from "../helpers/index.js";
import bcrypt from 'bcryptjs';
import { sendMail } from "../helpers/mailer.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/', auth, adminMiddleware, async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;

    try {
        // Get total count for metadata
        const totalCount = await User.countDocuments();
        const users = await User.find().skip(skipIndex).limit(limit).exec();

        return res.status(201).send({
            users,
            metadata: {
                page,
                limit,
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
            }
        });
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message })
    }
})

router.post('/', auth, adminMiddleware, async (req, res) => {
    try {
        const { first_name, last_name, email, isAdmin } = req.body;
        const userExists = await User.findOne({ email });
        
        if(userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const password = generatePassword(8);

        const hashedPassword = await bcrypt.hash(password, 12);
    
        if(!first_name || !last_name || !email) {
            return res.status(400).json({
                message: "Required fields are missing!",
            })
        }

        const newUser = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPassword,
            isAdmin: isAdmin || false,
        }

        const user = await User.create(newUser);
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        let data = {
            status: "success",
            message: "User created successfully",
            user: userWithoutPassword,
        }

        await sendMail(
            process.env.EMAIL_SMTP_USERNAME,
            // 'mrexcelsam1@gmail.com',
            email,
            "Your Account Password",
            `<p>Your account has been created. Your password is: <b>${password}</b></p>
            <p><a href="${process.env.CLIENT_URL}/login">Click here to login to your account</a></p>`
        );

        return res.status(201).send(data);
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message })
    }
})

router.get('/:id', auth, adminMiddleware, async (request, res) => {
    try {
        const { id } = request.params;

        const user = await User.findById(id);

        let data = {
            status: "success",
            message: "User fetched successfully",
            user,
        }

        return res.status(201).send(data);
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message })
    }
})

router.delete('/:id', auth, adminMiddleware, async (request, res) => {
    try {
        const { id } = request.params;

        const result = await User.findByIdAndDelete(id);

        if(!result) {
            return res.status(404).send({
                message: "User not found!",
            })
        }

        await sendMail(
            process.env.EMAIL_SMTP_USERNAME,
            result.email,
            // 'mrexcelsam1@gmail.com',
            "Account Deletion Notification",
            `<p>Your account with email ${result.email} has been deleted.</p>`
        );

        return res.status(201).send({
            message: 'User successfully deleted!!!',
            deletedItem: result,
            status: "success",
        });
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message })
    }
})

router.put('/:id', async (request, res) => {
    try {
        const { id } = request.params;

        const formData = request.body;
        const { first_name, last_name, email } = req.body;

        if(!first_name || !last_name || !email) {
            return res.status(400).json({
                message: "Required fields are missing!",
            })
        }

        const updatedUser = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
        }

        const result = await User.findByIdAndUpdate(id, updatedUser, { new: true});

        if(!result) {
            return res.status(404).send({
                message: "User not found!",
            })
        }

        return res.status(201).send(result);
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message })
    }
})

export default router;