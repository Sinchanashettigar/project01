const mongoose = require("mongoose");
const patientSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },

  email: {
    type: String,
  },

  phone_number: {
    type: Number,
  },
  id: {
    type: String,
    required: true,
  },

  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  bloodgroup: {
    type: String,
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    postal_code: {
      type: Number,
    },
    country: {
      type: String,
    },
  },
  dob: {
    type: Date,
    required: true,
  },
});
module.exports = mongoose.model("patient_details", patientSchema);
