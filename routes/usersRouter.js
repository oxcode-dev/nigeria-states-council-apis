import express from "express"
import { User } from "../models/user.js";

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

        // const hashedPassword = await bcrypt.hash(password, 12);

        if(!first_name || !last_name || !email) {
            return res.status(400).json({
                message: "Required fields are missing!",
            })
        }

        const newUser = {
            first_name: first_name,
            last_name: last_name,
            email: email,
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

        const ward = await Ward.findById(id);

        return response.status(201).send(ward);
    }
    catch (error) {
        console.log(error)
        response.status(500).send({ message: error.message })
    }
})

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Ward.findByIdAndDelete(id);

        if(!result) {
            return response.status(404).send({
                message: "Ward not found!",
            })
        }

        return response.status(201).send({
            message: 'Ward successfully deleted!!!',
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
        if(
            !formData.name || !formData.code || 
            !formData.zone || !formData.slogan
        ) {
            return response.status(400).send({
                message: "Required fields are missing!",
            })
        }

        const updatedWard = {
            name: formData.name,
            bio: formData.bio,
            code: formData.code,
            slogan: formData.slogan,
            zone: formData.zone,
        }

        const result = await Ward.findByIdAndUpdate(id, updatedWard, { new: true});

        if(!result) {
            return response.status(404).send({
                message: "Ward not found!",
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