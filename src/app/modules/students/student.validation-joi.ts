const Joi = require('joi');

// Define the Joi schema for UserName
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .pattern(/^[A-Z][a-z]*$/, 'capitalize format')
    .required()
    .messages({
      'string.pattern.name': 'You must follow capitalize format like this (Tawhidul Islam)',
    }),
  middleName: Joi.string().optional(),
  lastName: Joi.string().required(),
});

// Define the Joi schema for Guardian
const guardianValidatiionSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

// Define the Joi schema for LocalGuardian
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

// Define the Joi schema for Student
const studentValidationSchema  = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female').required()
    .messages({
      'any.only': '{#value} is not a valid gender',
    }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').optional(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidatiionSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});
export default studentValidationSchema 