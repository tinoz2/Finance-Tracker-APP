import mongoose from "mongoose";

const Schema = mongoose.Schema

const yearSchema = Schema({
    yearBudget: {
        type: Number,
        default: 0
    },
    softYear: {
        type: Boolean,
        default: false
    },
    hardYear: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export default mongoose.model('Year', yearSchema)