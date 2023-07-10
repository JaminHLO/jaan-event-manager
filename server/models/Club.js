const mongoose = require('mongoose');

const { Schema } = mongoose;

const clubSchema = new Schema({
  adminId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  events: [
    {
    type: Schema.Types.ObjectId,
    ref: 'Event'
    }
  ],
  title: {
    type: String,
    trim: true
  },
  description: {
    type: String
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
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
    type: Schema.Types.ObjectId,
    ref: "Notification",
  },
  zipCode: {
    type: Number
  },
  messages: [
    {
      type: String
    }
  ],
  price: {
    type: Number,
    default: 0
  },
  spotsAvailable: {
    type: Number,
    min: 0,
    default: 0
  }, 
  isAvailable: {
    type: Boolean,
    default: true
  },
  geocode: {
    type: String,
  }
});

clubSchema.pre('save', async function(next) {
  if (this.isNew) {
    this.spotsAvailable = this.maxMembers 
  }
  next()
})

const Club = mongoose.model('Club', clubSchema);

module.exports = Club;
