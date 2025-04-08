const mongoose = require("mongoose");
const manufactureSchema = new mongoose.Schema({
  vaccine_produced: {
    vacc_name: { type: String, required: true },
    vacc_type: { type: String, required: true },
    approval_status: { type: String, required: true },
    expiry_date: { type: String, required: true },
    production_date: { type: Date, required: true },
    vacc_batch: { type: String, required: true },
    dosage_after: { type: String },
    dosage_before: { type: String },
    dosage_frequency: { type: String },
  },
  target_age_group: {
    age_group_name: { type: String, required: true },
    minimum_age: { type: Number, required: true },
    maximum_age: { type: Number, required: true },
  },
  contact_information: {
    manufacture_name: { type: String, required: true },
    established_year: { type: String, required: true },
    contact_person_name: { type: String, required: true },
      email: { 
        type: String, 
        required: true, 
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ 
      },
       phone_number:{type:String,required:true,match:/^\d{10,}$/}
    },
    vaccine_detail: {
      description: { type: String, required: true },
      dosage_instruction: { type: String, required: true },
    },
    side_effects:[{type:Array}],
    // side_effects: [{ type: String }],
    contraindications:[{type:Array}],
    // contraindications: [{ type: String }],
},{ timestamps: true });

  module.exports =  mongoose.model('manufacture_details',manufactureSchema)
 