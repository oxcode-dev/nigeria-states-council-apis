import mongoose, { Schema } from "mongoose";

const stateSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true},
    bio: { type: String, required: false},
    code: { type: String, required: true},
    slogan: { type: String, required: true},
    geo_zone: { type: String, required: true},
    capital_city: { type: String, required: true},
    description: { type: String, required: false},
    creation_year: { type: Number, required: false},

    lgas: [{ type: Schema.Types.ObjectId, ref: 'local_govts' }]
})

export const State = mongoose.model("State", stateSchema);