import mongoose from 'mongoose'

const schema = {
    value: Number,
    timestamp: Date
}

export default mongoose.model('Energy', schema)