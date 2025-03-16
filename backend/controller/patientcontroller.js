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
    res.status(200).json({ status: "auth-01"  });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "auth-02" });
  }
};

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
module.exports = { insertPatientDetails, getPatientDetails };
