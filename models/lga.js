import mongoose from "mongoose";

const localGovtSchema = mongoose.Schema({
    name: { type: String, required: true},
    bio: { type: String, required: false},
    code: { type: String, required: true},
    // code: { type: Number, required: true},
    slogan: { type: String, required: true},
    zone: { type: String, required: true},
    // category: { 
    //     type: String,
    //     required: true,
    //     enum: ["course", "template",]
    // },
})

export const LocalGovt = mongoose.model("local_govts", localGovtSchema);