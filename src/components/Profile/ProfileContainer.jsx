import React from 'react';
import { connect } from 'react-redux';
import {
	getUsersProfile, getStatusProfile,
	updateStatusProfile, savePhoto, saveProfile
} from '../../redux/profileReducer';
import { withRouter } from 'react-router-dom';
import Profile from './Profile';
import { withAuthRederict } from '../../hoc/AuthRedirectComponent';
import { compose } from 'redux';



class ProfileContainer extends React.Component {
	refreshProfile() {
		let userId = this.props.match.params.userId;
		if (!userId) {
			userId = this.props.authorizedUserId;
		}
		this.props.getUsersProfile(userId)
		this.props.getStatusProfile(userId)
	}
	componentDidMount() {
		this.refreshProfile()
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.props.match.params.userId != prevProps.match.params.userId) {
			this.refreshProfile()
		}
	}

	render() {
		return (<Profile {...this.props}
			profile={this.props.profile}
			status={this.props.status}
			updateStatusProfile={this.props.updateStatusProfile}
			isOwner={!this.props.match.params.user}
			savePhoto={this.props.savePhoto}

		/>)
	}
}

const mapStateToProps = (state) => {
	return {
		profile: state.profilePage.profile,
		status: state.profilePage.status,
		authorizedUserId: state.auth.userId,
		isAuth: state.auth.isAuth,

	};
};

export default compose(connect(mapStateToProps, { getUsersProfile, getStatusProfile, updateStatusProfile, savePhoto, saveProfile }), withAuthRederict, withRouter)(ProfileContainer)