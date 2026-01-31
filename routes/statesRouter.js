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

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const product = await Product.findById(id);

        return response.status(201).send(product);
    }
    catch (error) {
        console.log(error)
        response.status(500).send({ message: error.message })
    }
})

router.delete('/:id', auth, async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Product.findByIdAndDelete(id);

        if(!result) {
            return response.status(404).send({
                message: "Product not found!",
            })
        }

        return response.status(201).send({
            message: 'Product successfully deleted!!!',
            deletedItem: result,
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
            !formData.name || !formData.priceInCents || !formData.category
        ) {
            return response.status(400).send({
                message: "Required fields are missing!",
            })
        }

        const updatedProduct = {
            name: formData.name,
            priceInCents: formData.priceInCents,
            category: formData.category,
            description: formData.description,
        }

        const result = await Product.findByIdAndUpdate(id, updatedProduct, { new: true});

        if(!result) {
            return response.status(404).send({
                message: "Product not found!",
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