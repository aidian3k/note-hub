import * as yup from 'yup';

export const noteEditScreenValidation = yup.object().shape({
	title: yup.string().required('Title of note is required'),
	content: yup.string().required('Some content is required')
});
