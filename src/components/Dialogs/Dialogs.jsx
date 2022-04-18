import DialogItem from './Dialog/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';
import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const Dialogs = (props) => {
	let dialogsElements = props.dialogsData
		.map(d => <DialogItem key={d} nameDialog={d.nameDialog} />);

	let messagsElements = props.messagsData
		.map(m => <Message key={m} messageDialog={m.messageDialog} />);

	const onSubmit = (values) => {
		props.addMessags(values.newMessageText)
	};
	const initialValues = () => {
		return ({ newMessageText: '' })
	};
	const validationSchema = () => Yup.object({
		newMessageText: Yup.string().required('Required'),
	});


	return (
		<div className={s.dialogs}>

			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				<PostForm />
			</Formik>
			<div className={s.dialogsItem}>
				{dialogsElements}
			</div>
			<div className={s.dialogsMessages}>
				{messagsElements}
			</div>
		</div>
	);
};
export default Dialogs;





const PostForm = (props) => {
	return (
		<Form>
			<div className={s.dialogsForm}>
				New message
				<div>
					<Field component={'textarea'} type={'textarea'} name={'newMessageText'}
						placeholder={'Enter your message'}
						className={s.dialogsBox} />
					<ErrorMessage name='newMessageText' />
				</div>
				<button type='submit' className={s.dialogsButton}>Add</button>
			</div>
		</Form>

	)
};

