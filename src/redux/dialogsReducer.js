const addMessagsItem = 'ADD-MESSAGS';

const initialState = {
	dialogsData: [
		{ nameDialog: 'Ilya', id: 1 },
		{ nameDialog: 'Semen', id: 2 },
		{ nameDialog: 'Kuzma', id: 3 },
		{ nameDialog: 'Semen', id: 4 },
		{ nameDialog: 'Nikolai', id: 5 },
	],

	messagsData: [
		{ messageDialog: 'Helloo!!', },
		{ messageDialog: 'Hello!! Serge', },
		{ messageDialog: 'Hello, it-kamasutra', },
		{ messageDialog: 'Yo', },
	],
};

const messageReducer = (state = initialState, action) => {

	switch (action.type) {

		case addMessagsItem:
			let newMessage = action.newMessageText;
			return {
				...state,
				messagsData: [...state.messagsData, { messageDialog: newMessage }],

			};

		default:
			return state;
	}
};

export const addMessagsActionCreator = (newMessageText) => ({
	type: addMessagsItem, newMessageText
});

export default messageReducer;