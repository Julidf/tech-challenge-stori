const mongoose = require("mongoose")
const { NewsletterTypes } = require("../services/constants")

const newsletterSchema = new mongoose.Schema({
    sentAt: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    recipientList : {
        type: Array,
        default: null,
    }
})

module.exports = mongoose.model("newsletter", newsletterSchema)