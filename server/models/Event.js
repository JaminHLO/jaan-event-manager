const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
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
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
