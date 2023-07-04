const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  clubs: [{
    type: Schema.Types.ObjectId,
    ref: 'Club'
  }]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
