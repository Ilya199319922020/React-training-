import React from 'react';
import { Contact } from './Profilinfo';
import { Formik, Form, Field, ErrorMessage, } from 'formik';
import * as Yup from 'yup';

const ProfileForm = (props) => {

	const initialValues = () => {
		return (
			{
				Fullname: '',
				lookingForAJob: '',
				lookingForAJobDescription: '',
				aboutMe: '',

			}
		)
	};

	const onSetSubmit = (values) => {
		props.onSubmit(values)
	};
	const validateYup = Yup.string().required('Required')
	const validationSchema = () => Yup.object({
		Fullname: validateYup,
		lookingForAJob: validateYup,
		lookingForAJobDescription: validateYup,
		aboutMe: validateYup,

	});

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSetSubmit}
			validationSchema={validationSchema}
		>
			<Form>

				<div>
					<b>Full name</b>:
					<Field
						type={'input'}
						name={'Fullname'}
						placeholder={"Full name"}
					/>
					<ErrorMessage name='Fullname' />
				</div>
				<div>
					<b>Loking profile a job</b>:
					<Field
						input type={'checkbox'}
						name={'lookingForAJob'}
						placeholder={"lookingForAJob"}
					/>
					<ErrorMessage name='Fullname' />
				</div>
				<div>
					<b>My professional skils</b>:
					<Field
						type={'input'}
						name={'lookingForAJobDescription'}
						placeholder={"My professional skils"}
					/>
					<ErrorMessage name='Fullname' />
				</div>
				<div>
					<b>About me</b>:
					<Field
						type={'input'}
						name={'aboutMe'}
						placeholder={"About me"}
					/>
					<ErrorMessage name='Fullname' />
				</div>
				<div>
					<b>Contacts</b>: {Object.keys(props.profile.contacts)
						.map(key => {
							return <div key={key} >

								<b> {key}</b>:
								<Field
									type={'textarea'}
									// name={'contacts' + key}
									name={'contacts.' + key}
									placeholder={key}
								/>
								<ErrorMessage name={'contacts.' + key} />
							</div>
						})}
				</div>
				<div>
					<button type={'submit'} >Save</button>
				</div>
			</Form>
		</Formik>
	)
};

export default ProfileForm;