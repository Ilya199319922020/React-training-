import { AuthApi } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';

const initialState = {
	userId: null,
	login: null,
	email: null,
	isAuth: false,
	captchaUrl: null,
};

const authReducer = (state = initialState, action) => {

	switch (action.type) {
		case SET_USER_DATA:
		case SET_CAPTCHA_URL: {
			return {
				...state,
				...action.payload,
			}
		}
		default:
			return state;
	}
};

export const setUsersData = (userId, login, email, isAuth) => ({
	type: SET_USER_DATA,
	payload: { userId, login, email, isAuth }
});

export const captchaSuccess = (captchaUrl) => ({
	type: SET_CAPTCHA_URL,
	payload: { captchaUrl },
});

export const getUsersData = () => async (dispatch) => {
	const data = await AuthApi.getHeader();
	if (data.resultCode === 0) {
		let { id, login, email } = data.data;
		dispatch(setUsersData(id, login, email, true))
	}
};

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
	const response = await AuthApi.login(email, password, rememberMe, captcha);
	if (response.data.resultCode === 0) {
		dispatch(getUsersData());
	} else {
		if (response.data.resultCode === 10) {
			dispatch(getCaptcha());
		}
		const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
		//прописать dispatch(stopSubmit)  при разборе с формик
	}
};

export const logout = () => async (dispatch) => {
	const response = await AuthApi.logout();
	if (response.data.resultCode === 0) {
		dispatch(setUsersData(null, null, null, false))
	}
};

export const getCaptcha = () => async (dispatch) => {
	const response = await AuthApi.getCaptcha();
	const captchaUrl = response.data.url;
	dispatch(captchaSuccess(captchaUrl));
};

export default authReducer;