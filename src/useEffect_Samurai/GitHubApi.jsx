import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import s from './GitHubApi.module.css'
import * as axios from 'axios';




const Search = (props) => {

	const [tempSearch, setTempSearch] = useState('');

	useEffect(() => {
		setTempSearch(props.value)
	}, [props.value]);

	return <div>
		<input type={'input'}
			onChange={(el) => { setTempSearch(el.currentTarget.value) }}
			value={tempSearch} />
		<button onClick={() => { props.onSubmit(tempSearch) }}>Find</button>
	</div>
};

const UsersList = (props) => {

	const [users, setUsersKamasutra] = useState([]);

	useEffect(() => {
		axios
			.get(`https://api.github.com/search/users?q=${props.term}`)
			.then(res =>
				setUsersKamasutra(res.data.items));
	}, [props.term]);

	return <div>
		<ul>
			{users
				.map(u => <li key={u.id} className={props.selectedUser === u ? s.selected : ''}
					onClick={() => {
						props.setSelectedUser(u)
					}}>
					{u.login}
				</li>)}
		</ul>
	</div>
};

const UserDetails = (props) => {
	const startSeconds = 10;
	const [usersDetails, setUsersDetails] = useState(null);
	const [seconds, setSeconds] = useState();

	useEffect(() => {
		if (!!props.selectedUser) {
			axios
				.get(`https://api.github.com/users/${props.selectedUser.login}`)
				.then(res => {
					setSeconds(startSeconds)
					setUsersDetails(res.data)
				});

		}
	}, [props.selectedUser]);

	useEffect(() => {
		if (seconds < 1) {
			setUsersDetails(null);
		}
	}, [seconds]);



	return <div>

		{usersDetails &&
			<div>
				<b>{usersDetails.login}</b>
				<Timer
					seconds={seconds}
					onChange={(actualSeconds) => { setSeconds(actualSeconds) }}
					timeKey={usersDetails.id.toString()}
				/>
				<img className={s.imageAvatar} src={usersDetails.avatar_url} />
				<br />
				{usersDetails.login}, followers:{usersDetails.followers}
			</div>}
	</div>
};

const Timer = (props) => {
	const [seconds, setSeconds] = useState(props.seconds);

	useEffect(() => {
		setSeconds(props.seconds)
	}, [props.seconds]);

	useEffect(() => {
		props.onChange(seconds)
	}, [seconds]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setSeconds((prev) => prev - 1)
		}, 1000);
		return () => {
			clearInterval(intervalId)
		};
	}, [props.timeKey]);


	return <div>{seconds}</div>
}





const GitHub = () => {
	const init = 'it-kamasutra';
	const [selectedUser, setSelectedUser] = useState(null);
	const [searchTerm, setSearchTerm] = useState(init);

	useEffect(() => {
		if (selectedUser) {
			document.title = selectedUser.login;
		}
	}, [selectedUser]);

	return (
		<div className={s.container}>
			<div className={s.containerItems}>
				<Search
					value={searchTerm}
					onSubmit={(value) => { setSearchTerm(value) }} />
				<button onClick={() => { setSearchTerm(init) }}>reset</button>
				<UsersList
					term={searchTerm}
					selectedUser={selectedUser}
					setSelectedUser={(user) => { setSelectedUser(user) }} />
			</div>
			<div>
				<UserDetails
					selectedUser={selectedUser}
				/>
			</div>
		</div >
	)
};

export default GitHub;