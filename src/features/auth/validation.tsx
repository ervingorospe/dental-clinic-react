import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const registerSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  userDetails: yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{10,15}$/, 'Phone number must be 10 or 15 digits')
      .required('Phone number is required'),
    birthDate: yup
      .date()
      .typeError('Must be a valid date')
      .max(new Date(2020, 3, 4), 'Must be born before April 4, 2020')
      .required('Birthdate is required'),
  }),
});