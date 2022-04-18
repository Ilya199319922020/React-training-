import MyPostsContainer from './MyPosts/MyPostsContainer';
import s from './Profile.module.css';
import ProfilInfo from './Profilinfo/Profilinfo';

const Profile = (props) => {
	return (
		<div className={s.content}>
			<ProfilInfo profile={props.profile}
				status={props.status}
				updateStatusProfile={props.updateStatusProfile}
				isOwner={props.isOwner}
				savePhoto={props.savePhoto}
				saveProfile={props.saveProfile}		
			/>
			<MyPostsContainer />
		</div>
	);
};
export default Profile;