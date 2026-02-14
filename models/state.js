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

    // lgas: [{ type: Schema.Types.ObjectId, ref: 'local_govts' }]
})

stateSchema.virtual('lgas', {
   ref: 'local_govts',
   localField: '_id', 
   foreignField: 'state_id',
});

// Set Object and Json property to true. Default is set to false
stateSchema.set('toObject', { virtuals: true });
stateSchema.set('toJSON', { virtuals: true });

export const State = mongoose.model("State", stateSchema);