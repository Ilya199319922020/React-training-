import React from 'react';
import { Formik, Form, Field, ErrorMessage, } from 'formik';
import * as Yup from 'yup';
import FormikControl from './FormikControl';



const FormikContainer = (props) => {
	const initialValues = {
		newMessageText: '',
		email: '',
		password: ''
	}
	const validationSchema = Yup.object({
		newMessageText: Yup.string().required('Required'),
		email: Yup.string().email('Invalid email format').required('Required'),
		passwod: Yup.string().required('Required'),
	})
	const onSubmit = values => {
		console.log('Form data', values);
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>			{formik => (
			<Form>
				<FormikControl
					control={props.control}
					{...props}
				/>
				{/* <button type='submit'>Submit</button> */}
			</Form>
		)}
		</Formik>
	)
}




export default FormikContainer