const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ordersSchema = new mongoose.Schema({
  items: { type: Array, required: true },
  total: { type: Number, required: true, min: 1 },
  date: { type: String, required: true },
  state: { type: String, required: true },
  buyer: { type: String, required: true },
  orderN: { type: Number }
});

ordersSchema.plugin(AutoIncrement, {id: 'order_seq', inc_field: 'orderN'});

const ordersModel = mongoose.model('Order', ordersSchema);

module.exports = ordersModel;