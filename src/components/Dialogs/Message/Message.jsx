import s from './../Dialogs.module.css';

const Message = (props) => {

	return (
		<div className={s.message} >
			<div>{props.messageDialog}</div>
		</div>

	);
};

export default Message;