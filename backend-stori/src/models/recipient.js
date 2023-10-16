const mongoose = require("mongoose")

const recipientSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("recipients", recipientSchema)