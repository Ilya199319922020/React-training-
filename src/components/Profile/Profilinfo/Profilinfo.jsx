import ImageLoading from '../../common/Loading/loading';
import ProfileStatus from './ProfileStatus/ProfileStatus';
//import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
import s from './Profilinfo.module.css';
import photosAvatar from '../../../assets/image/avatar.png';
import { useState } from 'react';
import ProfileForm from './ProfileForm';

const Profilinfo = (props) => {
	let [editMode, setEditMode] = useState(false);

	if (!props.profile) {
		return <ImageLoading />
	}
	const onMainPhotosSelected = (e) => {
		if (e.target.files.length) {
			props.savePhoto(e.target.files[0]);
		}
	}
	const onSubmit = (values) => {
		debugger;
		console.log('Form data', values);
		props.saveProfile(values);
		setEditMode(false);
	};
	return (
		<div className={s.profil}>
			<div>
				<img className={s.profilImage} src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg' />
			</div>
			<div>
				<div>
					<img className={s.avatarItem} src={props.profile.photos.large || photosAvatar} />
					{props.isOwner && <input type={'file'} onChange={onMainPhotosSelected} />}
					{editMode
						? <ProfileForm saveProfile={props.saveProfile}
							onSubmit={onSubmit}
							{...props} />
						: <ProfileData toGoEditMode={() => { setEditMode(true) }}   {...props} />}
				</div>
				<div>
					<ProfileStatus status={props.status} updateStatusProfile={props.updateStatusProfile} />
				</div>
			</div>
		</div>
	);
};

const ProfileData = (props) => {
	return (
		<div>
			{props.isOwner && <div>
				<button onClick={props.toGoEditMode}>Edit</button>
			</div>}
			<div>
				<b>Full name</b>: {props.profile.fullName}
			</div>
			<div>
				<b>Loking profile a job</b>: {props.profile.lookingForAJob ? 'yes' : 'no'}
			</div>
			{props.profile.lookingForAJob &&
				<div>
					<b>My professional skils</b>: {props.profile.lookingForAJobDescription}
				</div>}
			<div>
				<b>About me</b>: {props.profile.aboutMe ? 'yes' : 'no'}
			</div>
			<div>
				<b>Contacts</b>: {Object.keys(props.profile.contacts)
					.map(key => {
						return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
					})}
			</div>
		</div>
	)
};

export const Contact = (props) => {
	return <div className={s.contact}>
		<b>{props.contactTitle}</b>
		:{props.contactValue}</div>
};

export default Profilinfo;