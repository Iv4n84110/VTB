import React, { useState } from 'react'

import Aux from '../../hoc/Auxiliary'

import Header from '../Header'
import Footer from '../Footer'

import classes from './styles.css'

const PageLayout = (props) => {
	return (
		<Aux>
			<div className={classes.Content}>
				<Header modalHandler={props.modalHandler} auth={props.auth} />
				{props.children}
			</div>
		</Aux>
	)
}

export default PageLayout
