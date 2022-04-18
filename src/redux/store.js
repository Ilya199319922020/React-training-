import messageReducer from './dialogsReducer';
import profileReducer from './profileReducer';

let store = {
	_state: {
		profilePage: {
			postData: [
				{ like: 1, post: 'post 1', id: 1 },
				{ like: 2, post: 'post 2', id: 2 },
				{ like: 0, post: 'post 3', id: 3 },
				{ like: 1, post: 'post 4', id: 4 },
				{ like: 52, post: 'post 5', id: 5 },
				{ like: 10, post: 'post 6', id: 6 },
			],
			newProfilePost: 'He-he',
		},
		dialogsPage: {
			dialogsData: [
				{ nameDialog: 'Ilya', id: 1 },
				{ nameDialog: 'Semen', id: 2 },
				{ nameDialog: 'Kuzma', id: 3 },
				{ nameDialog: 'Semen', id: 4 },
				{ nameDialog: 'Nikolai', id: 5 },
			],
			newMessageText: '',
			messagsData: [
				{ messageDialog: 'Helloo!!', },
				{ messageDialog: 'Hello!! Serge', },
				{ messageDialog: 'Hello, it-kamasutra', },
				{ messageDialog: 'Yo', },
			],
		},
		sidebar: {},
	},
	_callSubscriber() {
		console.log('Aeeeee');
	},

	getState() {
		return this._state;
	},
	subscribe(observer) {
		this._callSubscriber = observer;
	},


	dispatch(action) {
		this._state.dialogsPage = messageReducer(this._state.dialogsPage, action);
		this._state.profilePage = profileReducer(this._state.profilePage, action);
		this._state.sidebar = sidebarReducer(this._state.sidebar, action);
		this._callSubscriber(this._state);
	},
};


export default store;