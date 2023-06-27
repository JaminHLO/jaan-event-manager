const mongoose = require('mongoose');

const { Schema } = mongoose;

const clubSchema = new Schema({
  adminId: {
    type: String,
    required: true,
  },
  events: {
    type: String,
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  members: {
    type: String
  },
  maxMembers: {
    type: Number,
    min: 1
  },
  image: {
    type: String
  },
  notifications: {
    type: String
  },
  zipCode: {
    type: Number
  },
  messages: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  }
});

const Club = mongoose.model('Club', clubSchema);

module.exports = Club;
