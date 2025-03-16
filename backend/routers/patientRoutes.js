const express = require('express');
const router = express.Router();

const { insertPatientDetails} = require("../controller/patientcontroller");
const { getPatientDetails }  = require ("../controller/patientcontroller");
router.post("/", insertPatientDetails);
router.get( "/:id", getPatientDetails);
module.exports = router;
