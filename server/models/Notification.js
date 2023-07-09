const mongoose = require("mongoose");

const {Schema } = mongoose;

const notificationSchema = new Schema({
    dateCreated: {
        type: Date,
        default: Date.now
    },
    message: {
        type: String,
        required: true,
        trim: true

    }
})

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;