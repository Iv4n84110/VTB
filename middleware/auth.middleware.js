const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
	if (req.method === 'OPTION') {
		return next()
	}

	try {
		const token = req.headers.authorization.split(' ')[1]
		if (!token) {
			throw new Error()
		}

		const decoded = jwt.verify(token, config.get('jwtSecret'))

		req.user = decoded
		req.token = token
		next()
	} catch (e) {
		/*
		if (e && e.name === 'TokenExpiredError') {
			return res
				.cookie('access-token', 'expired')
				.status(401)
				.json({ message: 'Нет аутентификации' })
		}
		*/
		res.status(401).json({ message: 'Нет аутентификации' })
	}
}
