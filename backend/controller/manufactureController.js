const mongoose = require("mongoose");

const manufactureModels = require("../models/manufactureModels");
const { validateManufactureData } = require("../services/validateManufacture");

const insertManufactureDetails = async (req, res) => {
  try {
    
    const {
      vacc_name,
      vacc_type,
      approval_status,
      expiry_date,
      production_date,
      vacc_batch,
      dosage_after,
      dosage_before,
      dosage_frequency,
      dosage_instruction,
      age_group_name,
      minimum_age,
      maximum_age,
      manufacture_name,
      established_year,
      contact_person_name,
      email,

      phone_number,
      description,
      side_effects,
      contraindications,
    } = req.body ;

    const manufactureData = {
      vaccine_produced: {
        vacc_name,
        vacc_type,
        approval_status,
        expiry_date,
        production_date,
        vacc_batch,
        dosage_after,
        dosage_before,
        dosage_frequency,
      },
      target_age_group: {
        age_group_name,
        minimum_age,
        maximum_age,
      },
      contact_information: {
        manufacture_name,
        established_year,
        contact_person_name,
        email,
        phone_number,
      },
      vaccine_detail: {
        description,
        dosage_instruction,
      },
      side_effects: Array.isArray(side_effects) ? side_effects : [side_effects],
      contraindications: Array.isArray(contraindications)
        ? contraindications
        : [contraindications],
    };

    console.log("Formatted Data:", manufactureData);

    const validationResult = validateManufactureData(manufactureData);

    if(validationResult.isValid === false){
       return res.status(200).json(validationResult);
    }
    console.log("Formatted Data:", manufactureData);

  


    // if (!manufactureData.vaccine_produced.vacc_name?.trim()) {
    //   return res.status(400).json({ status: "Vaccine name is mandatory" });
    // }
    // if (!manufactureData.vaccine_produced.vacc_type?.trim()) {
    //   return res.status(400).json({ status: "Vaccine type is mandatory" });
    // }
    // if (!manufactureData.target_age_group.age_group_name?.trim()) {
    //   return res.status(400).json({ status: "Age group name is required" });
    // }
    // if (typeof manufactureData.target_age_group.minimum_age !== "string") {
    //   return res.status(400).json({ status: "Enter a valid minimum age" });
    // }
    // if (typeof manufactureData.target_age_group.maximum_age !== "string") {
    //   return res.status(400).json({ status: "Enter a valid maximum age" });
    // }
    // if (!manufactureData.contact_information.manufacture_name?.trim()) {
    //   return res.status(400).json({ status: "Manufacture name is mandatory" });
    // }
    // if (!manufactureData.contact_information.contact_person_name?.trim()) {
    //   return res
    //     .status(400)
    //     .json({ status: "Contact person name is mandatory" });
    // }
    // if (!manufactureData.contact_information.email?.trim()) {
    //   return res.status(400).json({ status: "Email is required" });
    // }
    // if (!manufactureData.contact_information.phone_number?.trim()) {
    //   return res.status(400).json({ status: "Phone number is required" });
    // }
    // if (!manufactureData.vaccine_detail.description?.trim()) {
    //   return res.status(400).json({ status: "Description is required" });
    // }
    // if (!manufactureData.vaccine_detail.dosage_instruction?.trim()) {
    //   return res
    //     .status(400)
    //     .json({ status: "Dosage instruction is required" });
    // }


    
    
    const manufacture = await manufactureModels.create(manufactureData);
    return res.status(201).json({ status: "auth-01" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "author-02" });
  }
};

const getManufactureDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: "Invalid ID format" });
    }

    const manufacture = await manufactureModels.findById(id);

    if (manufacture) {
      res.status(200).json(manufacture);
    } else {
      res.status(404).json({ status: "no data found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "Internal server error" });
  }
};
module.exports = { insertManufactureDetails, getManufactureDetails };
