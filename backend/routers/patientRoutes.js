const express = require('express');
const router = express.Router();


const { insertPatientDetails} = require("../controller/patientcontroller");
const { getPatientDetails }  = require ("../controller/patientcontroller");
const { getAllPatients } = require ("../controller/patientcontroller");
const { updatePatientsDetails } = require ("../controller/patientcontroller");
router.post("/", insertPatientDetails);
router.get( "/:id", getPatientDetails);
router.get("/",getAllPatients)
router.put("/:id", updatePatientsDetails);
module.exports = router;
