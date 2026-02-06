import express from "express"
import { State } from "../models/state.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/', async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 1;
    const skipIndex = (page - 1) * limit;

    try {
            const states = await State.find()
            .sort({ name: 1 })
            .skip(skipIndex).limit(limit).exec();

        const totalCount = await State.countDocuments();

        return res.status(201).send({
            states,
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

router.post('/', auth, async (request, response) => {
    try {
        const formData = request.body;
        let existingState = await State.findOne({ name: formData.name });
        if(existingState) {
            return response.status(400).send({
                message: "State already exists!",
            })
        }
        if(
            !formData.name || !formData.code || 
            !formData.geo_zone || !formData.capital_city
        ) {
            return response.status(400).send({
                message: "Required fields are missing!",
            })
        }

        const newState = {
            name: formData.name,
            bio: formData.bio,
            code: formData.code,
            slogan: formData.slogan,
            geo_zone: formData.geo_zone,
            capital_city: formData.capital_city,
            description: formData.description,
            creation_year: formData.creation_year,
        }

        const state = await State.create(newState);

        let data = {
            status: "success",
            message: "State created successfully",
            state,
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

        const state = await State.findById(id);

        return response.status(201).send(state);
    }
    catch (error) {
        console.log(error)
        response.status(500).send({ message: error.message })
    }
})

router.delete('/:id', auth, async (request, response) => {
    try {
        const { id } = request.params;

        const result = await State.findByIdAndDelete(id);

        if(!result) {
            return response.status(404).send({
                message: "State not found!",
            })
        }

        return response.status(201).send({
            message: 'State successfully deleted!!!',
            deletedItem: result,
            status: "success",
        });
    }
    catch (error) {
        console.log(error)
        response.status(500).send({ message: error.message })
    }
})

router.put('/:id', auth, async (request, response) => {
    try {
        const { id } = request.params;

        const formData = request.body;

        if(
            !formData.name || !formData.code || 
            !formData.geo_zone || !formData.capital_city
        ) {
            return response.status(400).send({
                message: "Required fields are missing!",
            })
        }

        const updatedState = {
            name: formData.name,
            bio: formData.bio,
            code: formData.code,
            slogan: formData.slogan,
            geo_zone: formData.geo_zone,
            capital_city: formData.capital_city,
            description: formData.description,
            creation_year: formData.creation_year,
        }

        const result = await State.findByIdAndUpdate(id, updatedState, { new: true});

        if(!result) {
            return response.status(404).send({
                message: "State not found!",
            })
        }

         let data = {
            status: "success",
            message: "State updated successfully",
            state: result,
        }

        return response.status(201).send(data);
    }
    catch (error) {
        console.log(error)
        response.status(500).send({ message: error.message })
    }
})

export default router;