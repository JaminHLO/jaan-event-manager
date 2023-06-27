const mongoose = require('mongoose');

const { Schema } = mongoose;

const clubSchema = new Schema({
  adminId: {
    type: String,
    required: true,
  },
  events: [
    {
    type: Schema.Types.ObjectId,
    ref: 'Event'
    }
  ],
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
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
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
},
{
    toJSON: {
      virtuals: true
    }
});

clubSchema.virtual('currentNumMembers').length(function() {
  return this.members.length
})

const Club = mongoose.model('Club', clubSchema);

module.exports = Club;
