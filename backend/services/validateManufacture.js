const validateManufactureData = (data) => {
  let errors = [];

  if (!data.vaccine_produced.vacc_name) {
    errors.push("vaccine name is required");
  }
  if (!data.vaccine_produced.vacc_type) {
    errors.push("vaccine type is required");
  }
  if (!data.vaccine_produced.approval_status) {
    errors.push("approval status is required");
  }

  let expiry_date = new Date(data.vaccine_produced.expiry_date);
  let production_date = new Date(data.vaccine_produced.production_date);
  let today = new Date();

  if (!data.vaccine_produced.expiry_date) {
    error.push("expiry date  is required");
  } else if (expiry_date < today) {
    error.push("expiry date cannot  be in the past");
  }

  if (!data.vaccine_produced.production_date) {
    errors.push("production date is required");
  } else if (production_date > today) {
    errors.push("production date cannot be in the future");
  }

  

  if (!data.vaccine_produced.vacc_batch) {
    errors.push("vaccine batch is required");
  }

  // if (data.vaccine_produced.vacc_batch) {
  //     checkBatchExists(data.vaccine_produced.vacc_batch).then(exists => {
  //         if (exists) errors.push("Batch already exists. Cannot input.");
  //     });
  // }
 

  if (!data.vaccine_produced.dosage_before) {
    errors.push("dosage before is required ");
  }

  if (!data.vaccine_produced.dosage_after) {
    errors.push("dosage After is required ");
  }

  if (!data.vaccine_produced.dosage_frequency) {
    errors.push("dosage frequency is required");
  }

  if (!data.target_age_group.age_group_name) {
    error.push("age group name is required");
  }

  if (!data.target_age_group.minimum_age) {
    errors.push("Minimum age is required");

  }
  if (!data.target_age_group.maximum_age) {
    errors.push("maximum age age is required");
    
  }

  if (!data.contact_information.manufacture_name) {
    errors.push("manufacture name is required");
  }
  if (!data.contact_information.established_year) {
    errors.push("established year");
  }
  if (!data.contact_information.email) {
    errors.push("Email is required");
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(
      data.contact_information.email
    )
  ) {
    errors.push("Email must be in a valid format (example@example.com)");
  }

  if (!data.contact_information.phone_number) {
    errors.push("Phone number is required");
  } else if (!/^\d{10}$/.test(data.contact_information.phone_number)) {
    errors.push("Phone number must be exactly 10 digits");
  }

  if (!data.vaccine_detail.description) {
    errors.push("description is required");
  }
  if (!data.vaccine_detail.dosage_instruction) {
    errors.push("dosage instruction is required");
  }
  if (!data.side_effects.length ) {
    errors.push("At least one side effect is required.");
  }

  if (!data.contraindications) {
    errors.push("contraindication is required");
  }
  if (errors.length > 0) {
    return { isValid: false, errors };
  } else {
    return { isValid: true };
  }
};

module.exports = { validateManufactureData };
