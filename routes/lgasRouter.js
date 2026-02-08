import express from "express"
import { LocalGovt } from "../models/lga.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/', async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skipIndex = (page - 1) * limit;

    try {

        const totalCount = await LocalGovt.countDocuments();

        const lgas = await LocalGovt.find()
            .populate('state', 'name -_id')
            .sort({ name: 1 })
            .skip(skipIndex).limit(limit).exec()
            // .exec(function(err, lgas) {
            //     if (err) return handleError(err);

            //     // Manually sort the results in JavaScript after population
            //     lgas.sort(function(a, b) {
            //         if (a.state.name > b.state.name) return 1;
            //         if (a.state.name < b.state.name) return -1;
            //         return 0;
            //     });

            //     console.log(lgas);
            // });

        return res.status(201).send({
            lgas,
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
        let existingLga = await LocalGovt.findOne({ name: formData.name });
        if(existingLga) {
            return response.status(400).send({
                message: "Local Government already exists!",
            })
        }
        if(!formData.name || !formData.code || !formData.state_id || !formData.slogan) {
            return response.status(400).send({
                message: "Required fields are missing!",
            })
        }

        const newLga = {
            name: formData.name,
            code: formData.code,
            slogan: formData.slogan,
            state_id: formData.state_id,
            capital_town: formData.capital_town,
            state: formData.state_id,
            creation_year: formData.creation_year,
            description: formData.description,
        }

        const lga = await LocalGovt.create(newLga);

        let data = {
            status: "success",
            message: "Local Government created successfully",
            lga,
        }

        return response.status(201).send(data);
    }
    catch (error) {
        console.log(error)
        response.status(500).send({ message: error.message })
    }
})

router.get('/:id', auth, async (request, response) => {
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

router.delete('/:id', auth, async (request, response) => {
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
            status: "success",
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
            !formData.state_id || !formData.slogan
        ) {
            return response.status(400).send({
                message: "Required fields are missing!",
            })
        }

        const updatedLocalGovt = {
            name: formData.name,
            code: formData.code,
            slogan: formData.slogan,
            state_id: formData.state_id,
            capital_town: formData.capital_town,
            state: formData.state_id,
            creation_year: formData.creation_year,
            description: formData.description,
        }

        const result = await LocalGovt.findByIdAndUpdate(id, updatedLocalGovt, { new: true});

        if(!result) {
            return response.status(404).send({
                message: "Local Government not found!",
            })
        }

        let data = {
            status: "success",
            message: "Local Government updated successfully",
            result,
        }

        return response.status(201).send(data);
    }
    catch (error) {
        console.log(error)
        response.status(500).send({ message: error.message })
    }
})

export default router;