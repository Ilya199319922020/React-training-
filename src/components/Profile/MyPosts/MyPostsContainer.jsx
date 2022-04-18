import { connect } from 'react-redux';
import { addProfileActionCreator, updateNewProfileActionCreator } from '../../../redux/profileReducer';
import MyPosts from './MyPosts';


const mapStateToProps = (state) => {
	return {
		postData: state.profilePage.postData,
		newProfilePost: state.profilePage.newProfilePost,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addPost: () => {
			dispatch(addProfileActionCreator());
		},
		updateNewPostText: (textPost) => {
			let action = updateNewProfileActionCreator(textPost);
			dispatch(action);
		},
	};
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;




