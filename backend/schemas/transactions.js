import mongoose from "mongoose";

const Schema = mongoose.Schema

const transactionSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

export default mongoose.model('Transaction', transactionSchema)