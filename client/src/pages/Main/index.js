import React, { useState } from 'react'
import Modal from '../../shared/Modal'
import PageLayout from '../../shared/PageLayout'
import SignIn from './SignIn'

const Main = () => {
	return (
		<PageLayout auth={false}>
			<SignIn />
		</PageLayout>
	)
}

export default Main
