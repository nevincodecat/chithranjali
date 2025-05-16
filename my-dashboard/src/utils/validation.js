// validation.js

export const validateForm = (formData) => {
  const errors = {};

  // Validate Name
  if (!formData.name) {
    errors.name = "Name is required";
  }

  // Validate Age
  // if (!formData.age) {
  //   errors.age = "Age is required";
  // } else if (isNaN(formData.age) || formData.age <= 0) {
  //   errors.age = "Age must be a valid number greater than 0";
  // }

  // Validate Price
  if (!formData.price) {
    errors.price = "Price is required";
  } else if (isNaN(formData.price) || formData.price <= 0) {
    errors.price = "Price must be a valid number greater than 0";
  }

  //   // Validate Mobile
  //   if (!formData.mobile) {
  //     errors.mobile = "Mobile is required";
  //   } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.mobile)) {
  //     errors.mobile = "Mobile number is invalid";
  //   }

  return errors;
};
