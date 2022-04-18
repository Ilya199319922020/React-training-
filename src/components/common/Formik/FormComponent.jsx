import { ErrorMessage, Field } from "formik";
import TextError from "./TextError";

export const TextArea = (props) => {
	const { name, type, ...rest } = props;
	return (
		<div>
			<Field type={type} name={name} {...rest} />
			<ErrorMessage name={name} component={TextError} />
		</div>
	)
};

export const LoginFormItem = (props) => {
	const { name, type, placeholder, ...rest } = props;
	return (
		<div>
			<Field
				type={type}
				name={name}
				placeholder={placeholder} {...rest} />
			<ErrorMessage name={name} component={TextError} />
		</div>

	)
};

export const Button = (props) => {
	const { name, type, placeholder, ...rest } = props;
	return (
		<div>
			<Field
				type={type}
				name={name}
				placeholder={placeholder} {...rest} />
			<ErrorMessage name={name} component={TextError} />
		</div>

	)
};
