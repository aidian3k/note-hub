import * as yup from 'yup';

export const registerValidationSchema = yup.object().shape({
	email: yup.string().email('Invalid email address').required('Email is required'),
	password: yup
		.string()
		.min(3, 'Password must be at least 6 characters')
		.required('Password is required'),
	confirmationPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Passwords must match')
		.required('Confirmation password is required'),
	firstName: yup.string().required('Name is required'),
	lastName: yup.string().required('Last name is required')
});
