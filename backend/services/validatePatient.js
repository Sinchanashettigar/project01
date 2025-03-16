const validatePatientData = (data) => {
  let errors = [];

 
  if (!data.first_name ) {
    errors.push("First name is required");
  } else if (!/^[A-Z][a-zA-Z'’-\s]*$/.test(data.first_name)) {
    errors.push(
      "First name must start with an uppercase letters"
    );
  }

  if (!data.last_name) {
    errors.push("Last name is required");
  } else if (!/^[A-Z][a-zA-Z]*$/.test(data.last_name)) {
    errors.push(
      "First letter of last name must be uppercase and only letters are allowed"
    );
  }


  if (!["Male", "Female", "other"].includes(data.gender)) {
    errors.push("Gender must be Male, Female, or other");
  }

 
  if (!data.dob) {
    errors.push("Date of birth is required");
  } else {
    const dob = new Date(data.dob);
    const today = new Date();
    if (dob > today) {
      errors.push("Date of birth cannot be in the future");
    }
  }

 
  if (!data.id || data.id.length < 6 || data.id.length > 12) {
    errors.push("ID must be between 6 to 12 characters");
  }

  
  if (!data.phone_number) {
    errors.push("Phone number is required");
  } else if (!/^\d{10}$/.test(data.phone_number)) {
    errors.push("Phone number must be exactly 10 digits");
  }


  if (!data.email) {
    errors.push("Email is required");
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(data.email)
  ) {
    errors.push("Email must be in a valid format (example@example.com)");
  }


  if (!data.bloodgroup) {
    errors.push("Blood group is required");
  }

  if (!data.address.street) errors.push("Street is required");
  if (!data.address.city) errors.push("City is required");
  if (!data.address.state) errors.push("State is required");
  if (!data.address.postal_code) errors.push("Postal code is required");
  if (!data.address.country) errors.push("Country is required");
console.log(data.address);

 
  if (errors.length > 0) {
    return { isValid: false, errors };
  } else {
    return { isValid: true };
  }
};

module.exports = { validatePatientData };
