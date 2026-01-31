import express from "express"
import { State } from "../models/State.js";

const router = express.Router();

router.get('/', async(req, res) => {

    try {
        return res.status(201).send('Hello World');

        const states = await State.find();

        return res.status(201).send(states);
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message })
    }
})

// router.post('/', async (request, response) => {
//     try {
//         const formData = request.body;
//         if(
//             !formData.name || !formData.code || 
//             !formData.zone || !formData.slogan
//         ) {
//             return response.status(400).send({
//                 message: "Required fields are missing!",
//             })
//         }

//         const newState = {
//             name: formData.name,
//             bio: formData.bio,
//             code: formData.code,
//             slogan: formData.slogan,
//             zone: formData.zone,
//         }

//         const state = await State.create(newState);

//         return response.status(201).send(state);
//     }
//     catch (error) {
//         console.log(error)
//         response.status(500).send({ message: error.message })
//     }
// })

// router.get('/:id', async (request, response) => {
//     try {
//         const { id } = request.params;

//         const state = await State.findById(id);

//         return response.status(201).send(state);
//     }
//     catch (error) {
//         console.log(error)
//         response.status(500).send({ message: error.message })
//     }
// })

// router.delete('/:id', async (request, response) => {
//     try {
//         const { id } = request.params;

//         const result = await State.findByIdAndDelete(id);

//         if(!result) {
//             return response.status(404).send({
//                 message: "State not found!",
//             })
//         }

//         return response.status(201).send({
//             message: 'State successfully deleted!!!',
//             deletedItem: result,
//         });
//     }
//     catch (error) {
//         console.log(error)
//         response.status(500).send({ message: error.message })
//     }
// })

// router.put('/:id', async (request, response) => {
//     try {
//         const { id } = request.params;

//         const formData = request.body;
//         if(
//             !formData.name || !formData.code || 
//             !formData.zone || !formData.slogan
//         ) {
//             return response.status(400).send({
//                 message: "Required fields are missing!",
//             })
//         }

//         const updatedState = {
//             name: formData.name,
//             bio: formData.bio,
//             code: formData.code,
//             slogan: formData.slogan,
//             zone: formData.zone,
//         }

//         const result = await State.findByIdAndUpdate(id, updatedState, { new: true});

//         if(!result) {
//             return response.status(404).send({
//                 message: "State not found!",
//             })
//         }

//         return response.status(201).send(result);
//     }
//     catch (error) {
//         console.log(error)
//         response.status(500).send({ message: error.message })
//     }
// })

export default router;