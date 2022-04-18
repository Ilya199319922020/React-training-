import Post from './Posts/Post';
import s from './MyPosts.module.css';
import React from 'react';



const MyPosts = (props) => {
	console.log('render');
	let postsElements = props.postData
		.map(p => <Post like={p.like} post={p.post} id={p.id} />);

	let newPostElements = React.createRef();

	let addPostElements = () => {
		props.addPost();
	};
	let onPostChange = () => {
		let textPost = newPostElements.current.value;
		props.updateNewPostText(textPost);
	};

	return (
		<div className={s.list}>
			My post
			<div className={s.postForm}>
				New Post
				<textarea className={s.postBox} onChange={onPostChange} ref={newPostElements} value={props.newProfilePost} />
				<button onClick={addPostElements} className={s.postButton}>send</button>
			</div>
			{postsElements}
		</div>
	);
};

export default React.memo(MyPosts);