import express from "express"
import { State } from "../models/state.js";
import { LocalGovt } from "../models/lga.js";

const router = express.Router();

router.get('/states/', async(req, res) => {

    try {
        const states = await State.find().exec();

        const totalCount = await State.countDocuments();

        return res.status(201).send({
            data: states,
            metadata: {
                totalCount,
            }
        });
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }
})

router.get('/states/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const state = await State.findById(id);

        return response.status(201).send(state);
    }
    catch (error) {
        response.status(500).send({ message: error.message })
    }
})

router.get('/states/:name/lgas', async (request, response) => {
    try {
        const { name } = request.params;

        const state = await State.findOne({ name })
            .populate({
                path: 'lgas',
                select: ['name', '_id']
            }).exec();

        let data = {
            status: "success",
            lgas: state.lgas,
            state: {
                name: state.name,
                code: state.code,
                id: state._id,
            },
        }

        return response.status(201).send(data);
    }
    catch (error) {
        response.status(500).send({ message: error.message })
    }
})

router.get('/lgas/', async(req, res) => {

    try {
        const lgas = await LocalGovt.find().exec();

        const totalCount = await LocalGovt.countDocuments();

        return res.status(201).send({
            data: lgas,
            metadata: {
                totalCount,
            }
        });
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }
})

router.get('/lgas/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const lga = await LocalGovt.findById(id);

        return response.status(201).send(lga);
    }
    catch (error) {
        response.status(500).send({ message: error.message })
    }
})

export default router;