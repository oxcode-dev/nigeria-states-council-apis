import mongoose, { Schema } from "mongoose";

const localGovtSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    code: { type: String, required: true },
    slogan: { type: String, required: false },
    capital_town: { type: String, required: true },
    state_id: { type: String, required: true },
    creation_year: { type: Number, required: false },

    state: { type: Schema.Types.ObjectId, ref: 'State', required: true },
})

export const LocalGovt = mongoose.model("local_govts", localGovtSchema);