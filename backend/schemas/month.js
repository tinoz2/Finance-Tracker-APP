import mongoose from "mongoose";

const Schema = mongoose.Schema

const monthSchema = Schema({
    monthBudget: {
        type: Number,
        default: 0
    },
    softMonth: {
        type: Boolean,
        default: false
    },
    hardMonth: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export default mongoose.model('Month', monthSchema)