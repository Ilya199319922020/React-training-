import React, { useEffect, useState } from 'react';
import s from '../../Profilinfo/Profilinfo.module.css';


const ProfileStatusWithHooks = (props) => {

	let [editMode, setEditMode] = useState(false);
	let [status, setStatus] = useState(props.state);

	useEffect(() => {
		setStatus(props.status);
	}, [props.status])

	const activeEditmode = () => {
		setEditMode(true);
	};
	const deactiveEditmode = () => {
		debugger;
		setEditMode(false);
		props.updateStatusProfile(status);
	};
	const onStatusChange = (e) => {
		setStatus(e.currentTarget.value);
	};

	return (
		<div className={s.profileStatus}>
			{!editMode && <div>
				<span onDoubleClick={activeEditmode}>{status || "No status"}</span>
			</div>}
			{editMode && <div>
				<input onChange={onStatusChange}
					autoFocus={true}
					onBlur={deactiveEditmode}
					value={status} />
			</div>}
		</div>
	);

}

export default ProfileStatusWithHooks;