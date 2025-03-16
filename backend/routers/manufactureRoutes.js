const express = require('express');
const router = express.Router();


const { insertManufactureDetails } = require("../controller/manufactureController");
const { getManufactureDetails } = require("../controller/manufactureController");

router.get("/:id", getManufactureDetails); 
router.post("/", insertManufactureDetails);

module.exports = router;

