import React from 'react';
import s from '../../Profilinfo/Profilinfo.module.css';


class ProfileStatus extends React.Component {
	state = {
		editMode: false,
		status: this.props.status,
	}
	activeEditmode = () => {
		this.setState({
			editMode: true
		})
	}
	deactiveEditmode = () => {
		this.setState({
			editMode: false
		})
		this.props.updateStatusProfile(this.state.status)
	}
	onStatusChange = (e) => {

		this.setState({
			status: e.currentTarget.value,
		});
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.status !== this.props.status) {
			this.setState({
				status: this.props.status,
			})
		}
	}
	render() {
		return (
			<div className={s.profileStatus}>
				{!this.state.editMode && <div>
					<b>Status</b>: <span onDoubleClick={this.activeEditmode}>{this.state.status || "No status"}</span>
				</div>}
				{this.state.editMode && <div>
					<input onChange={this.onStatusChange}
						autoFocus={true}
						onBlur={this.deactiveEditmode}
						value={this.state.status} />
				</div>}
			</div>
		);
	}
}

export default ProfileStatus;