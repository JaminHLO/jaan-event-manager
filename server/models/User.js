const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Order = require('./Order');

const userSchema = new Schema({
  // userId: {
  //   ID: ID
  // },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  myEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }
  ],
  myClubs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Club'
    }
  ],
  participants: [
    {
      type: String
    }
  ],
  image: {
    type: String
  },
  address: {
    type: String,
  },
  orders: [Order.schema],
  geocode: {
    type: String,
  }
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
