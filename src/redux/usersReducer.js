import { UsersApi } from "../api/api";

const FOLLOW = 'FOLLOW';
const ONFOLLOW = 'ONFOLLOW';
const SET_USERS = 'ADDUSERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


const initialState = {
	users: [],
	pageSize: 10,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: [],
	portionSize: 10

};

const usersReducer = (state = initialState, action) => {

	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: state.users.map(u => {
					if (u.id === action.userId) {
						return { ...u, followed: true }
					}
					return u;
				})
			}
		case ONFOLLOW:
			return {
				...state,
				users: state.users.map(u => {
					if (u.id === action.userId) {
						return { ...u, followed: false }
					}
					return u;
				})
			}
		case SET_USERS:
			return {
				...state, users: action.users
			}
		case SET_CURRENT_PAGE:
			return {
				...state, currentPage: action.currentPage
			}
		case SET_TOTAL_USERS_COUNT:
			return {
				...state, totalUsersCount: action.count
			}
		case SET_IS_FETCHING:
			return {
				...state, isFetching: action.isFetching
			}
		case TOGGLE_IS_FOLLOWING_PROGRESS:
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter(id => id != action.userId)
			}
		default:
			return state;
	}
};

const follow = (userId) => ({ type: FOLLOW, userId });
const onfollow = (userId) => ({ type: ONFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount });
export const setIsFetching = (isFetching) => ({ type: SET_IS_FETCHING, isFetching });
export const toggleIsFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });

export const getPageUsers = (currentPage, pageSize) => async (dispatch) => {
	dispatch(setIsFetching(true));
	const data = await UsersApi.getUsers(currentPage, pageSize);
	dispatch(setIsFetching(false));
	dispatch(setUsers(data.items));
	dispatch(setTotalUsersCount(data.totalCount));

};

export const getChangedPageUsers = (pageNumber, pageSize) => async (dispatch) => {
	dispatch(setCurrentPage(pageNumber));
	dispatch(setIsFetching(true));
	const data = await UsersApi.getUsers(pageNumber, pageSize);
	dispatch(setIsFetching(false));
	dispatch(setUsers(data.items));
	dispatch(setTotalUsersCount(data.totalCount));
};

export const followsOnfollows = async (dispatch, userId, apiMethod, actionCreator) => {
	dispatch(toggleIsFollowingProgress(true, userId));
	const response = await apiMethod(userId);
	if (response.data.resultCode === 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(toggleIsFollowingProgress(false, userId));
};

export const follows = (userId) => async (dispatch) => {
	followsOnfollows(dispatch, userId, UsersApi.postFollow.bind(UsersApi), follow);
};

export const onfollows = (userId) => async (dispatch) => {
	followsOnfollows(dispatch, userId, UsersApi.deleteOnFollow.bind(UsersApi), onfollow);
};
export default usersReducer;

// export const onfollows = (userId) => async (dispatch) => {
// 	dispatch(toggleIsFollowingProgress(true, userId));
// 	const response = await UsersApi.deleteOnFollow(userId);
// 	if (response.data.resultCode === 0) {
// 		dispatch(onfollow(userId))
// 	}
// 	dispatch(toggleIsFollowingProgress(false, userId));
// };