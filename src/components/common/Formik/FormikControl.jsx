import React from 'react';
import { Button, LoginFormItem, TextArea } from './FormComponent';

const FormikControl = (props) => {
	const { control, ...rest } = props;
	switch (control) {
		case 'input':
		case 'email':
			return <LoginFormItem {...rest} />
		case 'password':
			return <LoginFormItem {...rest} />
		case 'textarea':
			return <TextArea {...rest} />;
		case 'button':
			return <Button {...rest} />;
		default: return null;
	}
};

export default FormikControl;
