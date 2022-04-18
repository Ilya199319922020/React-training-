import React from 'react';
import { connect } from 'react-redux';
import {
	follows, onfollows, setCurrentPage,
	setIsFetching, setTotalUsersCount,
	setUsers, toggleIsFollowingProgress,
	getPageUsers, getChangedPageUsers
} from '../../redux/usersReducer';
import Users from './Users';
import ImageLoading from '../common/Loading/loading';
import { withAuthRederict } from '../../hoc/AuthRedirectComponent';
import { compose } from 'redux';
import { getFollowingInProgress, getIsFetching, getPageSize, getPageUsersList, getPortionSize, getTotalUsersCount, getUsersList } from '../../redux/usersSelectors';



class UsersContainer extends React.Component {
	componentDidMount() {
		this.props.getPageUsers(this.props.currentPage, this.props.pageSize)
	}
	onPageChanged = (pageNumber) => {
		this.props.getChangedPageUsers(pageNumber, this.props.pageSize);
		// this.props.setCurrentPage(pageNumber);
		// this.props.setIsFetching(true);
		// UsersApi.getUsers(pageNumber, this.props.pageSize)
		// 	.then(data => {
		// 		this.props.setIsFetching(false);
		// 		this.props.setUsers(data.items);
		// 		this.props.setTotalUsersCount(data.totalCount);
		// 	});
	}
	render() {

		return <>

			{
				this.props.isFetching ?
					<ImageLoading /> : null
			}
			<Users
				portionSize={this.props.portionSize}
				currentPage={this.props.currentPage}
				totalUsersCount={this.props.totalUsersCount}
				pageSize={this.props.pageSize}
				users={this.props.users}
				onPageChanged={this.onPageChanged}
				onfollows={this.props.onfollows}
				follows={this.props.follows}
				followingInProgress={this.props.followingInProgress}
				toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
			/>
		</>

	}
}

const mapStateToProps = (state) => {
	return {
		users: getUsersList(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getPageUsersList(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state),
		portionSize: getPortionSize(state)
	};
};
// const UsersAuthRederict = withAuthRederict(UsersContainer);

// export default connect(mapStateToProps, {
// 	follows,
// 	onfollows,
// 	setCurrentPage,
// 	toggleIsFollowingProgress,
// 	getUsers,
// 	getChangedPageUsers
// })(UsersAuthRederict);

export default compose(connect(mapStateToProps, {
	follows, onfollows, setCurrentPage, toggleIsFollowingProgress,
	getPageUsers,
	getChangedPageUsers
}), withAuthRederict)(UsersContainer);


// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		follow: (userId) => {
// 			dispatch(followAC(userId));
// 		},
// 		onfollow:
// 			(userId) => {
// 				dispatch(onfollowAC(userId));
// 			},
// 		setUsers: (users) => {
// 			dispatch(setUsersAC(users));
// 		},
// 		setCurrentPage: (currentPage) => {
// 			dispatch(setCurrentPageAC(currentPage));
// 		},
// 		setTotalUsersCount: (totalCount) => {
// 			dispatch(setTotalUsersCountAC(totalCount));
// 		},
// 		setIsFetching: (isFetching) => {
// 			dispatch(setIsFetchingAC(isFetching));
// 		},
// 	};
// };