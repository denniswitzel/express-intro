import mongoose from 'mongoose'

const schema = {
    rating: Number,
    comprehension: Number,
    motto: String,
    notes: String,
    timestamp: Date
}

export default mongoose.model('Journal', schema)