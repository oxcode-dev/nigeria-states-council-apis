import express from "express"
import { State } from "../models/State.js";

const router = express.Router();

router.get('/', async(req, res) => {

    try {
        const states = await State.find();

        return res.status(201).send(states);
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message })
    }
})

router.post('/', async (request, response) => {
    try {
        const formData = request.body;
        if(
            !formData.name || !formData.code || 
            !formData.zone || !formData.slogan
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
            zone: formData.zone,
        }

        const state = await State.create(newState);

        return response.status(201).send(state);
    }
    catch (error) {
        console.log(error)
        response.status(500).send({ message: error.message })
    }
})

export default router;