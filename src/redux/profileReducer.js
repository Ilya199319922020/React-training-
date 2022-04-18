import { ProfileApi, UsersApi } from "../api/api";

const addProfileItem = 'ADD-POST';
const updateNewProfileItem = 'UPDATE-NEW-POST';
const SET_USERS_PROFILE = 'SET_USERS_PROFILE';
const SET_STATUS_USERS = 'SET_STATUS_USERS';
const SET_FHOTOS_SAVE = 'SET_FHOTOS_SAVE';

const initialState = {
	postData: [
		{ like: 1, post: 'post 1', id: 1 },
		{ like: 2, post: 'post 2', id: 2 },
		{ like: 0, post: 'post 3', id: 3 },
		{ like: 1, post: 'post 4', id: 4 },
		{ like: 52, post: 'post 5', id: 5 },
		{ like: 10, post: 'post 6', id: 6 },
	],
	newProfilePost: 'He-he',
	profile: null,
	status: '',
};

export const profileReducer = (state = initialState, action) => {

	switch (action.type) {
		case addProfileItem:
			let newPost = {
				id: 5,
				post: state.newProfilePost,
				like: 0,
			}
			return {
				...state,
				postData: [...state.postData, newPost],
				newProfilePost: '',
			}
		case updateNewProfileItem: {
			return {
				...state,
				newProfilePost: action.newTextPost,
			}
		}
		case SET_USERS_PROFILE: {
			return {
				...state,
				profile: action.profile,
			}
		}
		case SET_STATUS_USERS:
			return {
				...state,
				status: action.status,
			}
		case SET_FHOTOS_SAVE:
			return {
				...state,
				profile: { ...state.profile, photos: action.photos },
			}

		default:
			return state;
	}
};


export const addProfileActionCreator = () => ({
	type: addProfileItem
});
export const updateNewProfileActionCreator = (textPost) => ({
	type: updateNewProfileItem,
	newTextPost: textPost,
});
export const setUsersProfile = (profile) => ({
	type: SET_USERS_PROFILE,
	profile: profile
});

export const setUsersStatus = (status) => ({
	type: SET_STATUS_USERS,
	status: status
});

export const setPhotosSuccess = (photos) => ({
	type: SET_FHOTOS_SAVE,
	photos
});




export const getUsersProfile = (userId) => async (dispatch) => {
	const data = await UsersApi.getProfile(userId)
	dispatch(setUsersProfile(data));
};

export const getStatusProfile = (userId) => async (dispatch) => {
	const response = await ProfileApi.getStatus(userId)
	dispatch(setUsersStatus(response.data));
};

export const updateStatusProfile = (status) => async (dispatch) => {
	const response = await ProfileApi.updateStatus(status)
	if (response.data.resultCode === 0) {
		dispatch(setUsersStatus(status));
	}
};
export const savePhoto = (file) => async (dispatch) => {
	const response = await ProfileApi.savePhotos(file);
	if (response.data.resultCode === 0) {
		dispatch(setPhotosSuccess(response.data.data.photos));
	}
};

export const saveProfile = (profile) => async (dispatch, getState) => {
	const userId = getState().auth.userId;
	const response = await ProfileApi.saveProfile(profile);
	debugger;
	if (response.data.resultCode === 0) {
		dispatch(getUsersProfile(userId));
	}
};



export default profileReducer;