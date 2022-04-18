import { NavLink } from 'react-router-dom';
import s from './Nav.module.css';

const Nav = () => {
	return (
		<nav className={s.nav}>
			<div className={s.item}>
				<NavLink to='/profile' className={navData => navData.isActive ? s.active : s.item}>
					Profile
				</NavLink>
			</div>
			<div className={s.item}>
				<NavLink to='/dialogs' className={navData => navData.isActive ? s.active : s.item}>
					Dialogs
				</NavLink>
			</div>
			<div className={s.item}>
				<NavLink to='/users' className={navData => navData.isActive ? s.active : s.item}>
					Users
				</NavLink>
			</div>
			<div className={s.item}>
				<NavLink to='/news' className={navData => navData.isActive ? s.active : s.item}>
					News
				</NavLink>
			</div>
			<div className={s.item}>
				<NavLink to='/music' className={navData => navData.isActive ? s.active : s.item}>
					Music
				</NavLink>
			</div>
			<div className={s.item}>
				<NavLink to='/login' className={navData => navData.isActive ? s.active : s.item}>
					Login
				</NavLink>
			</div>
		</nav>
	);
};
export default Nav;