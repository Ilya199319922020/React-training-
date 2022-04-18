import React from 'react';
import s from './Login.module.css';
import { Formik, Form, Field, ErrorMessage, } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { login } from '../../redux/authReducer'
import { Redirect } from 'react-router-dom';


const LoginForm = (props) => {

	const initialValues = () => {
		return (
			{
				email: '',
				password: '',
				rememberMe: '',
				captcha: '',
			}
		)
	};

	const onSubmit = (values, onSubmitProps) => {
		const { email, password, rememberMe, captcha } = values;
		props.login(email, password, rememberMe, captcha);
				onSubmitProps.setSubmitting(false);
	};

	const validationSchema = () => Yup.object({
		email: Yup.string().email('Invalid email format').required('Required'),
		password: Yup.string().required('Required'),

	})
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{formik => {
				console.log(formik);
				return (
					<Form className={s.formLogin}>
						<div className={s.formConrol}>
							<Field
								type={'text'}
								name={'email'}
								component={'input'}
								placeholder={"Login"}
							/>
							<ErrorMessage name='email' />
						</div>
						<div className={s.formConrol}>
							<Field
								placeholder={"Password"}
								name={'password'}
								component={'input'}
								type={'password'}
							/>
							<ErrorMessage name='password' />
						</div>
						<div>
							<Field className={s.loginFormInput}
								name={'rememberMe'}
								input type={'checkbox'}
							/>
							remeber me
						</div>
						<div>
							<button
								type={'submit'}
								disabled={!formik.isValid || formik.isSubmitting}
							>Login</button>
						</div>
						{props.captchaUrl && <img src={props.captchaUrl} className={s.captchaImage} />}
						{props.captchaUrl && <div className={s.captchaInput}>
							<Field
								type={'input'}
								name={'captcha'}
								placeholder={'captcha'}
							/>
							<ErrorMessage name='captcha' />
						</div>}
					</Form>)
			}
			}
		</Formik>
	)
};

const Login = (props) => {
	if (props.isAuth) {
		return <Redirect to={'/profile'} />
	}

	return (
		<div >
			<h1>Login</h1>
			<LoginForm captchaUrl={props.captchaUrl} {...props} />
		</div>
	);
};


const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuth,
		captchaUrl: state.auth.captchaUrl
	};
};


export default connect(mapStateToProps, { login })(Login);



