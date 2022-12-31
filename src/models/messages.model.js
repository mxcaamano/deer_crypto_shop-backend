const mongoose = require("mongoose");
    
  const messageSchema = new mongoose.Schema({
    author: {
      id: { type: String, required: true },
      alias: { type: String, required: true },
      avatar: { type: String, required: true }
    },
    text: { type: String, required: true },
    date: { type: String, required: true },
    __v: { type: Number, select: false}
  })
    
  const messagesModel = mongoose.model('Messages', messageSchema);

  module.exports = messagesModel;