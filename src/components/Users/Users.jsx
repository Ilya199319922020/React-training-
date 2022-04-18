import React from 'react';
import s from './Users.module.css';
import photosAvatar from '../../assets/image/avatar.png';
import { NavLink } from 'react-router-dom';
import Paginator from '../common/Loading/Paginator/Paginator';


const Users = (props) => {
	return (
		<div className={s.users}>
			<Paginator
				totalUsersCount={props.totalUsersCount}
				pageSize={props.pageSize}
				currentPage={props.currentPage}
				onPageChanged={props.onPageChanged}
				portionSize={props.portionSize}
			/>
			{props.users.map(u => <div key={u.id} className={s.user}>
				<div className={s.userButtonAvatar}>
					<div>
						<NavLink to={'/profile/' + u.id}>
							<img src={u.photos.small != null ? u.photos.small : photosAvatar} className={s.userAvatar} />
						</NavLink>
					</div>
					<div className={s.userButton}>
						{u.followed
							? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
								debugger;
								props.onfollows(u.id)
							}}>OnFollow</button>
							: <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
								debugger;
								props.follows(u.id)
							}}>Follow</button>}
					</div>
				</div>
				<div className={s.userInfo}>
					<div className={s.userNameStatus}>
						<span>{u.name}</span>
						<span>{u.status}</span>
					</div>
					<div className={s.userLocation}>
						<span>{"u.location.city"}</span>
						<span>{"u.location.country"}</span>
					</div>
				</div>
			</div>)
			}
		</div >
	);

};

export default Users;