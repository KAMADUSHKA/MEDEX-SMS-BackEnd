const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, "Email can't be null"],
    },
    password: {
      type: String,
      required: [true, "Password can't be null"],
    },
    login_count: {
      type: Number,
      default: 0,
    },
    account_lock: {
        type: Boolean,
        default: false,
    },
    locked_at: {
        type: Date,
        default: null,
    },
    isAdmin: {
      type: Boolean,
      default: false, 
    },
   
  });
  
  module.exports = mongoose.model("Admin", adminSchema);
  