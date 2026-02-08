import express from "express"
import { User } from "../models/user.js";
import { generatePassword } from "../helpers/index.js";

const router = express.Router();

router.get('/', async(req, res) => {
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

router.post('/', async (request, response) => {
    try {
        const { first_name, last_name, email } = req.body;
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
        }

        const user = await User.create(newUser).select('-password');

        let data = {
            status: "success",
            message: "User created successfully",
            user,
        }

        return response.status(201).send(data);
    }
    catch (error) {
        console.log(error)
        response.status(500).send({ message: error.message })
    }
})

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const user = await User.findById(id);

        let data = {
            status: "success",
            message: "User fetched successfully",
            user,
        }

        return response.status(201).send(data);
    }
    catch (error) {
        console.log(error)
        response.status(500).send({ message: error.message })
    }
})

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await User.findByIdAndDelete(id);

        if(!result) {
            return response.status(404).send({
                message: "User not found!",
            })
        }

        return response.status(201).send({
            message: 'User successfully deleted!!!',
            deletedItem: result,
        });
    }
    catch (error) {
        console.log(error)
        response.status(500).send({ message: error.message })
    }
})

router.put('/:id', async (request, response) => {
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
            return response.status(404).send({
                message: "User not found!",
            })
        }

        return response.status(201).send(result);
    }
    catch (error) {
        console.log(error)
        response.status(500).send({ message: error.message })
    }
})

export default router;