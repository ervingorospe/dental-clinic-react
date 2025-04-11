import * as yup from 'yup';

export const profileSchema = yup.object().shape({
  userDetails: yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{10,15}$/, 'Phone number must be 10 or 15 digits')
      .required('Phone number is required'),
      birthDate: yup
      .string()
      .matches(/^\d{2}-\d{2}-\d{4}$/, "Date must be in mm-dd-yyyy format")
      .test("is-valid-date", "Must be a valid date", (value) => {
        if (!value) return false;
        const [month, day, year] = value.split("-").map(Number);
        const parsedDate = new Date(year, month - 1, day);
        return !isNaN(parsedDate.getTime()); // Ensure it's a valid date
      })
      .test("max-date", "Must be born before April 4, 2020", (value) => {
        if (!value) return false;
        const [month, day, year] = value.split("-").map(Number);
        const parsedDate = new Date(year, month - 1, day);
        return parsedDate <= new Date(2020, 3, 4); // Compare with max date
      })
      .required("Birthdate is required"),
  }),
});

export const passwordSchema = yup.object().shape({
  currentPassword: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required')
});