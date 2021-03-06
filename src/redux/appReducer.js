import { getUsersData } from "./authReducer";

const SET_INITIALIZED = 'SET_INITIALIZED';

const initialState = {
	initialized: false,
};

const appReducer = (state = initialState, action) => {

	switch (action.type) {
		case SET_INITIALIZED: {
			return {
				...state,
				initialized: true,
			}
		}
		default:
			return state;
	}
};

export const initializedSuccess = () => ({
	type: SET_INITIALIZED,
});

export const initializeApp = () => (dispatch) => {
	let promise = dispatch(getUsersData());
	Promise.all([promise])
		.then(() => {
			dispatch(initializedSuccess());
		});

};



export default appReducer;