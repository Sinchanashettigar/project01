const patientModels = require("../models/patientModels");
const { validatePatientData } = require("../services/validatePatient");

const insertPatientDetails = async (req, res) => {
  try {
    console.log("Patient body ", req.body);

    const {
      first_name,
      last_name,
      gender,
      email,
      phone_number,
      id,
      height,
      weight,
      bloodgroup,
      dob,
      street,
      city,
      state,
      postal_code,
      country,
      hasAllergies,
      allergyDetails,
      hasChronicIllness,
      chronicIllnessDetails,
      hasDietaryRestrictions,
      hasPhysicalDisabilities,
      hashospitalized,
      hospitalizedDetais,
      hasillnesses,
      illnessesDetails,
      hasmedicalconditions,
      medicalconditionsDetails,
      hasmedications,
      medicationsDetails,
      hassurgeries,
      surgeriesDetails,
      mentalhealthDetails,
      vaccinename,
      vaccinedatepicker,
      dosageform,
      isAdditionalVaccineDetailsUsed,
      additionalFields
    } = req.body;
    
 const patientData = {
  first_name,
  last_name,
  gender,
  email,
  phone_number,
  id,
  height,
  weight,
  bloodgroup,
  dob,
  address: {
    street,
    city,
    state,
    postal_code,
    country,
  },
  hasAllergies,
  allergyDetails,
  hasChronicIllness,
  chronicIllnessDetails,
  hasDietaryRestrictions,
  hasPhysicalDisabilities,
  hashospitalized,
  hospitalizedDetais,
  hasillnesses,
  illnessesDetails,
  hasmedicalconditions,
  medicalconditionsDetails,
  hasmedications,
  medicationsDetails,
  hassurgeries,
  surgeriesDetails,
  mentalhealthDetails,
  vaccinename,
  vaccinedatepicker,
  dosageform,
  // isAdditionalVaccineDetailsUsed,
  // additionalFields: Array.isArray(additionalFields) ? additionalFields : []
    };

    
    const validationResult = validatePatientData(patientData);
    
    if(validationResult.isValid === false){
      return res.status(200).json(validationResult);
    }
    console.log("Req body:", req.body);
    console.log("Form Data :" , patientData)


    const patient = await patientModels.create(patientData);
    // const allPatients = await patientModels.find();
    res.status(200).json({ status: "auth-01"  });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "auth-02" });
  }
};

// const getAllPatients =  async(req ,res) =>
// {
//   try{
//     const patients = await patient.find();
//     return res.status(200).json(patients);
//   }catch(error){
//     console.log(error);
//     res.status(500).json({status: "error", message:error.message});
//   }
// }

const getPatientDetails = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id :", id);
    
    const patient = await patientModels.findById(id);

    if (patient.length !== 0) {
      console.log("PAtient found :", patient );
      
      res.status(200).json(patient);
    } else {
      res.status(200).json({ status: "No data found" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllPatients = async (req,res) =>
{
  try {
    const patients = await patientModels.find({});
    res.status(200).json(patients);
  } catch(error) {
    console.error(error);
    res.status(500).json({status :" Error fetching all patients"});

  }
};
const updatePatientsDetails = async (req, res) => {
  try {
    console.log("Update request received:", req.params.id, req.body);

    const updatedPatient = await patientModels.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedPatient) {
      console.log(" Patient not found with _id:", req.params.id);
      return res.status(404).json({ message: "Patient not found" });
    }

    console.log("Patient updated:", updatedPatient);
    res.json(updatedPatient);

  } catch (error) {
    console.error(" Error in updatePatientsDetails:", error);
    res.status(500).json({ message: "Error updating patient", error: error.message });
  }
};





module.exports = { insertPatientDetails, getPatientDetails, getAllPatients, updatePatientsDetails };

