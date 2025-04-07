const patientModels = require("../models/patientModels");
const { validatePatientData } = require("../services/validatePatient");
const insertPatientDetails = async (req, res) => {
  try {
    console.log(req.body);

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
    } = req.body;
    
 const patientData = {
      first_name,
      last_name,
      gender,
      email,
      id,
      height,
      weight,
      phone_number,
      bloodgroup,
      address: {
        street,
        city,
        state,
        postal_code,
        country,
      },
      dob,
    };

    const validationResult = validatePatientData(patientData);

    if(validationResult.isValid === false){
       return res.status(200).json(validationResult);
    }
    console.log("Formatted Data:", patientData);


    const patient = await patientModels.create(patientData);
    const allPatients = await patientModels.find();
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
    const patient = await patientModels.find({ id });

    if (patient.length !== 0) {
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
// const updatePatientsDetails = async (req,res) =>
// {
//   try {
//     const patients = await patientModels.find({});
//     res.status(200).json(patients);
//   }catch(error)
//   {
//     console.log(error);
//     res.status(500).json({status:" Error fetching all patients"});
//   }
// }

const updatePatientsDetails = async (req, res) => {
  try {
    // Ensure the patient ID is valid
    const id = req.params.id; // Get patient ID from the route parameter

    // Check if patientId is provided
    if (!id) {
      return res.status(400).json({ status: "Error", message: " ID is required" });
    }

    // The body should contain the fields you want to update (e.g., first_name, dob, etc.)
    const updatedPatientData = req.body;

    // Perform the update operation using the patientId
    const updatedPatient = await patientModels.findByIdAndUpdate(id, updatedPatientData, { new: true });

    // Check if the update operation was successful
    if (!updatedPatient) {
      return res.status(404).json({ status: "Error", message: "Patient not found or update failed" });
    }

    // Return the updated patient data
    res.status(200).json({ status: "auth-01", updatedPatient });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error", message: "Error updating patient details" });
  }
};




module.exports = { insertPatientDetails, getPatientDetails, getAllPatients, updatePatientsDetails };

