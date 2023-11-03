const mongoose = require("mongoose")
const { NewsletterTypes } = require("../services/constants")

const recipientSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    unsubscribedAt: {
        type: Date,
        default: null,
    }
})

module.exports = mongoose.model("recipients", recipientSchema)