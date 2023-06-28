const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
  clubId: {
    type: Schema.Types.ObjectId,
    ref: 'Club'
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  location: {
    type: String
  },
  // price: {
  //   type: Number,
  //   required: true,
  // },
  participants: [
    {
    type: Schema.Types.ObjectId,
    ref: 'User'
    }
  ],
  dateTime: {
    type: String,
  },
  image: {
    type: String
  },
  address: {
    type: String
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
