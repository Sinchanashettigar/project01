const express = require('express');
const router = express.Router();


const { insertManufactureDetails } = require("../controller/manufactureController");
const { getManufactureDetails } = require("../controller/manufactureController");
const { getAllManufactures,updateManufacturerDetails } =require('../controller/manufactureController');
router.get("/:id", getManufactureDetails); 
router.post("/", insertManufactureDetails);
router.get("/", getAllManufactures);
router.put('/', updateManufacturerDetails);

module.exports = router;

