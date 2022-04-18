	import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

let mapStateToPropsForRederict = (state) => {
	return {
		isAuth: state.auth.isAuth,
	};
};

export const withAuthRederict = (Component) => {

	class RederictComponent extends React.Component {
		render() {
			if (!this.props.isAuth) return <Redirect to={'/login'} />;
			return <Component {...this.props} />
		}
	}
	let ConnectedAuthRederict = connect(mapStateToPropsForRederict)(RederictComponent)
	return ConnectedAuthRederict;
}