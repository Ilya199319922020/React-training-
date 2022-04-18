import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRederict } from '../../hoc/AuthRedirectComponent';
import { addMessagsActionCreator, updateNewMessageActionCreator } from '../../redux/dialogsReducer'
import Dialogs from './Dialogs';


const mapStateToProps = (state) => {
	return {
		dialogsData: state.dialogsPage.dialogsData,
		messagsData: state.dialogsPage.messagsData,
		// newMessageText: state.dialogsPage.newMessageText,
			};
};

const mapDispatchToProps = (dispatch) => {

	return {
		addMessags: (newMessageText) => {
		dispatch(addMessagsActionCreator(newMessageText));
		},
	};
};


export default compose(connect(mapStateToProps, mapDispatchToProps),withAuthRederict)(Dialogs)







// const DialogsContainer = () => {
	// 	return (
	// 		<StoreContext.Consumer>
	// 			{(store) => {
	// 				const state = store.getState();
	
	// 				let addMessagsElements = () => {
	// 					store.dispatch(addMessagsActionCreator());
	// 				};
	
	// 				let onMessageChange = (text) => {
	// 					let action = updateNewMessageActionCreator(text);
	// 					store.dispatch(action);
	// 				};
	// 				return <Dialogs
	// 					addMessags={addMessagsElements}
	// 					updateNewMessage={onMessageChange}
	// 					dialogsData={state.dialogsPage.dialogsData}
	// 					messagsData={state.dialogsPage.messagsData}
	// 					newMessageText={state.dialogsPage.newMessageText} />
	// 			}
	// 			}
	
	// 		</StoreContext.Consumer>
	
	// 	);
	// };
	// export default DialogsContainer;