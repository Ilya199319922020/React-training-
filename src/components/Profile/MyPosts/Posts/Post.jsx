import s from './Post.module.css';

const Post = (props) => {
	return (
		<div className={s.item}>

			<img src='https://proprikol.ru/wp-content/uploads/2019/08/krutye-kartinki-dlya-vk-43.jpg' />
			<div>
				{props.post}
			</div>
			<div>
				<span>
					{props.like}
				</span>
				<span>
					{props.id}
				</span>
			</div>
		</div>
	);
};
export default Post;