export const getUsersList = (state) => {
	return state.usersPage.users;
};
export const getPageSize = (state) => {
	return state.usersPage.pageSize;
};
export const getTotalUsersCount = (state) => {
	return state.usersPage.totalUsersCount;
};
export const getPageUsersList = (state) => {
	return state.usersPage.currentPage;
};
export const getIsFetching = (state) => {
	return state.usersPage.isFetching;
};
export const getFollowingInProgress = (state) => {
	return state.usersPage.followingInProgress;
};
export const getPortionSize = (state) => {
	return state.usersPage.portionSize;
};
