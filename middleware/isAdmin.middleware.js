const bcrypt = require('bcryptjs')
const User = require('../models/User')

module.exports = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.userId)
		if (!user.isAdmin) {
			throw new Error()
		}

		req.user = user
		next()
	} catch (e) {
		console.log('error', e)
		res.status(401).json({ message: 'Нет авторизации' })
	}
}
