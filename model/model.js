const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    id: {
        required: true,
        type: Number
    },
    first_name: {
        required: true,
        type: String
    },
    last_name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    gender: {
        required: true,
        type: String
    },
    income: {
        required: true,
        type: String
    },
    city: {
        required: true,
        type: String
    },
    car: {
        required: true,
        type: String
    },
    quote: {
        required: true,
        type: String
    },
    phone_price: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Data', dataSchema)