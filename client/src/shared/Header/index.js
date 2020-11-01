import React from 'react'

import classes from './styles.css'
import Logo from './Logo'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'

const Header = (props) => {
	return (
		<header className={classes.Header}>
			<div className={classes.Row}>
				<div onClick={props.redirectToMain} className={classes.LogoWrapper}>
					<Logo />
				</div>
				<span className={classes.Text}>{'mvault'}</span>

				{props.auth ? (
					<LogoutButton modalHandler={props.modalHandler}>Выйти</LogoutButton>
				) : (
					<LoginButton>Личный кабинет</LoginButton>
				)}
			</div>
		</header>
	)
}

export default Header
