const mongoose = require("mongoose");

const WardSchema = new mongoose.Schema({
  wardNumber: {
    type: Number, // ensure to use capital 'Number'
    required: true,
    unique: true,
  },
  numberOfHouses: {
    type: Number,
    required: true,
  },
  wardMember: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Ward", WardSchema);
