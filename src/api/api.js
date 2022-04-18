import * as axios from 'axios';


const intance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		"API-KEY": "5c43c029-b2e8-46ca-9735-31af70dbe32f",
	},

});

export const UsersApi = {
	getUsers(currentPage = 1, pageSize = 10) {
		return (
			intance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
				return response.data
			})
		)
	},
	getHeader() {
		return (
			intance.get(`auth/me`).then(response => {
				return response.data
			})
		)
	},
	getProfile(userId) {
		return (
			intance.get(`profile/${userId}`)
				.then(response => { return response.data })
		)
	},
	postFollow(userId) {
		return intance.post(`follow/${userId}`)
	},
	deleteOnFollow(userId) {
		return intance.delete(`follow/${userId}`)
	}
};

export const ProfileApi = {

	getStatus(userId) {
		return intance.get(`profile/status/${userId}`)
	},

	updateStatus(status) {
		return intance.put(`profile/status/`, { status: status });
	},
	savePhotos(file) {
		const formData = new FormData();
		formData.append('image', file);
		debugger;
		return intance.put(`profile/photo`, formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		);
	},
	saveProfile(profile) {
		return intance.put(`profile`, profile);
	}
};

export const AuthApi = {
	getHeader() {
		return (
			intance.get(`auth/me`).then(response => {
				return response.data
			})
		)
	},
	login(email, password, rememberMe = false, captcha = null) {
		return intance.post(`auth/login`, { email, password, rememberMe, captcha });
	},
	logout() {
		return intance.delete(`auth/login`);
	},
	getCaptcha() {
		return intance.get(`/security/get-captcha-url`);
	},
};