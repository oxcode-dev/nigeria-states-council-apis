import express from "express"
import { LocalGovt } from "../models/lga.js";
import mongoose from "mongoose"

const router = express.Router();

router.get('/', async(req, res) => {

    try {
        const db = mongoose.connection.db;

        // Use listCollections() to get a cursor, then convert to an array
        const collections = await db.listCollections().toArray();

        return res.status(201).send((collections));

        const lgas = await LocalGovt.find();

        return res.status(201).send('hello');
        // return res.status(201).send(lgas);
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

        const newLga = {
            name: formData.name,
            bio: formData.bio,
            code: formData.code,
            slogan: formData.slogan,
            zone: formData.zone,
        }

        const lga = await LocalGovt.create(newLga);

        return response.status(201).send(lga);
    }
    catch (error) {
        console.log(error)
        response.status(500).send({ message: error.message })
    }
})

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const lga = await LocalGovt.findById(id);

        return response.status(201).send(lga);
    }
    catch (error) {
        console.log(error)
        response.status(500).send({ message: error.message })
    }
})

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await LocalGovt.findByIdAndDelete(id);

        if(!result) {
            return response.status(404).send({
                message: "Local Government not found!",
            })
        }

        return response.status(201).send({
            message: 'Local Government successfully deleted!!!',
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

        const updatedLocalGovt = {
            name: formData.name,
            bio: formData.bio,
            code: formData.code,
            slogan: formData.slogan,
            zone: formData.zone,
        }

        const result = await LocalGovt.findByIdAndUpdate(id, updatedLocalGovt, { new: true});

        if(!result) {
            return response.status(404).send({
                message: "Local Government not found!",
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