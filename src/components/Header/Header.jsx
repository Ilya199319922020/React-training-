import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
const Header = (props) => {
	return (
		<header className={s.header}>
			<img src='https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg' />
			<div className={s.headerLoginItem}>
				{props.isAuth ?
					<div>
						{props.login} - <button onClick={props.logout}>Log out</button>
					</div> :
					<NavLink to={'/login'}>Login</NavLink>}
			</div>
		</header>

	);
};
export default Header;