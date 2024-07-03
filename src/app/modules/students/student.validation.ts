import { z } from 'zod';

// Define the Zod schema for UserName
const userNameValidationSchema = z.object({
  firstName: z.string().refine((value) => {
    const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    return firstNameStr === value;
  }, {
    message: 'You must follow capitalize format like this (Tawhidul Islam)',
  }),
  middleName: z.string().optional(),
  lastName: z.string().nonempty('Last name is required'),
});

// Define the Zod schema for Guardian
const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty('Father name is required'),
  fatherOccupation: z.string().nonempty('Father occupation is required'),
  fatherContactNo: z.string().nonempty('Father contact number is required'),
  motherName: z.string().nonempty('Mother name is required'),
  motherOccupation: z.string().nonempty('Mother occupation is required'),
  motherContactNo: z.string().nonempty('Mother contact number is required'),
});

// Define the Zod schema for LocalGuardian
const localGuardianValidationSchema = z.object({
  name: z.string().nonempty('Local guardian name is required'),
  occupation: z.string().nonempty('Local guardian occupation is required'),
  contactNo: z.string().nonempty('Local guardian contact number is required'),
  address: z.string().nonempty('Local guardian address is required'),
});

// Define the Zod schema for Student
const studentValidationSchema = z.object({
  id: z.string().nonempty('ID is required'),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female'], {
    errorMap: () => ({ message: '{VALUE} is not a valid gender' }),
  }),
  dateOfBirth: z.string().optional(),
  email: z.string().email('Invalid email format'),
  contactNo: z.string().nonempty('Contact number is required'),
  emergencyContactNo: z.string().nonempty('Emergency contact number is required'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  presentAddress: z.string().nonempty('Present address is required'),
  permanentAddress: z.string().nonempty('Permanent address is required'),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
});

export default studentValidationSchema;