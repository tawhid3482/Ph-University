import { z } from 'zod';

// Define the Zod schema for UserName
const createUserNameValidationSchema = z.object({
  firstName: z.string().refine(
    (value) => {
      const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
      return firstNameStr === value;
    },
    {
      message: 'You must follow capitalize format like this (Tawhidul Islam)',
    }
  ),
  middleName: z.string().optional(),
  lastName: z.string().nonempty('Last name is required'),
});

// Define the Zod schema for Guardian
const createGuardianValidationSchema = z.object({
  fatherName: z.string().nonempty('Father name is required'),
  fatherOccupation: z.string().nonempty('Father occupation is required'),
  fatherContactNo: z.string().nonempty('Father contact number is required'),
  motherName: z.string().nonempty('Mother name is required'),
  motherOccupation: z.string().nonempty('Mother occupation is required'),
  motherContactNo: z.string().nonempty('Mother contact number is required'),
});

// Define the Zod schema for LocalGuardian
const createLocalGuardianValidationSchema = z.object({
  name: z.string().nonempty('Local guardian name is required'),
  occupation: z.string().nonempty('Local guardian occupation is required'),
  contactNo: z.string().nonempty('Local guardian contact number is required'),
  address: z.string().nonempty('Local guardian address is required'),
});

// Define the Zod schema for Student
const createStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female'], {
        errorMap: () => ({ message: '{VALUE} is not a valid gender' }),
      }),
      dateOfBirth: z.string().optional(),
      email: z.string().email('Invalid email format'),
      contactNo: z.string().nonempty('Contact number is required'),
      emergencyContactNo: z
        .string()
        .nonempty('Emergency contact number is required'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().nonempty('Present address is required'),
      permanentAddress: z.string().nonempty('Permanent address is required'),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      profileImg: z.string().optional(),
      admissionSemester: z.string(),
      academicDepartment: z.string()
      
    }),
  }),
});
const updateUserNameValidationSchema = z.object({
  firstName: z.string().refine(
    (value) => {
      const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
      return firstNameStr === value;
    },
    {
      message: 'You must follow capitalize format like this (Tawhidul Islam)',
    }
  ).optional(),
  middleName: z.string().optional(),
  lastName: z.string().nonempty('Last name is required').optional(),
});

// Define the Zod schema for Guardian
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().nonempty('Father name is required').optional(),
  fatherOccupation: z.string().nonempty('Father occupation is required').optional(),
  fatherContactNo: z.string().nonempty('Father contact number is required').optional(),
  motherName: z.string().nonempty('Mother name is required').optional(),
  motherOccupation: z.string().nonempty('Mother occupation is required').optional(),
  motherContactNo: z.string().nonempty('Mother contact number is required').optional(),
});

// Define the Zod schema for LocalGuardian
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().nonempty('Local guardian name is required').optional(),
  occupation: z.string().nonempty('Local guardian occupation is required').optional(),
  contactNo: z.string().nonempty('Local guardian contact number is required').optional(),
  address: z.string().nonempty('Local guardian address is required').optional(),
});

// Define the Zod schema for Student
const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female'], {
        errorMap: () => ({ message: '{VALUE} is not a valid gender' }),
      }).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email('Invalid email format').optional(),
      contactNo: z.string().nonempty('Contact number is required').optional(),
      emergencyContactNo: z
        .string()
        .nonempty('Emergency contact number is required').optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().nonempty('Present address is required').optional(),
      permanentAddress: z.string().nonempty('Permanent address is required').optional(),
      guardian: updateGuardianValidationSchema,
      localGuardian: updateLocalGuardianValidationSchema,
      profileImg: z.string().optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional()
      
    }),
  }),
});

export const StudentValidationSchema = {
   createStudentValidationSchema,
   updateStudentValidationSchema
};
