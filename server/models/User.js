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
  orders: [Order.schema]
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.pre("insertMany", async function (next, docs) {
  if (Array.isArray(docs) && docs.length) {
      const hashedUsers = docs.map(async (user) => {
          return await new Promise((resolve, reject) => {
              bcrypt.genSalt(10).then((salt) => {
                  let password = user.password.toString()
                  bcrypt.hash(password, salt).then(hash => {
                      user.password = hash
                      resolve(user)
                  }).catch(e => {
                      reject(e)
                  })
              }).catch((e) => {
                  reject(e)
              })
          })
      })
      docs = await Promise.all(hashedUsers)
      next()
  } else {
      return next(new Error("User list should not be empty")) // lookup early return pattern
  }
})

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
