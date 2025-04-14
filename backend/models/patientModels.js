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
    state: {
      type: String,
    },
    postal_code: {
      type: Number,
    },
    country: {
      type: String,
    }
  },
  dob: {
    type: Date,
    required: true,
  },

  hasAllergies: { type: String },
  allergyDetails: { type: String },
  hasChronicIllness: { type: String },
  chronicIllnessDetails: { type: String },
  hasDietaryRestrictions: { type: String },
  hasPhysicalDisabilities: { type: String },
  hashospitalized: { type: String },
  hospitalizedDetais: { type: String },
  hasillnesses: { type: String },
  illnessesDetails: { type: String },
  hasmedicalconditions: { type: String },
  medicalconditionsDetails: { type: String },
  hasmedications: { type: String },
  medicationsDetails: { type: String },
  hassurgeries: { type: String },
  surgeriesDetails: { type: String },
  mentalhealthDetails: { type: String },
  vaccinename: { type: String },
  vaccinedatepicker: { type: Date },
  dosageform: { type: String },
  // isAdditionalVaccineDetailsUsed: { type: String },
  // additionalFields: { type: [mongoose.Schema.Types.Mixed], default: [] },
});
module.exports = mongoose.model("patient_details", patientSchema);
