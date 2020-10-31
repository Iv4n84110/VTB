const config = require('config')
const jwt = require('jsonwebtoken')
const { v4: uuid } = require('uuid')
const Token = require('../models/Token')

const generateAccessToken = (userId) => {
	const payload = {
		userId,
		type: config.get('jwt.access.type'),
	}
	const options = {
		expiresIn: config.get('jwt.access.expiresIn'),
	}

	return jwt.sign(payload, config.get('jwtSecret'), options)
}

const generateRefreshToken = () => {
	const payload = {
		id: uuid(),
		type: config.get('jwt.refresh.type'),
	}
	const options = {
		expiresIn: config.get('jwt.refresh.expiresIn'),
	}

	return {
		id: payload.id,
		token: jwt.sign(payload, config.get('jwtSecret'), options),
	}
}

const replaceDbRefreshToken = (tokenId, userId) => {
	return Token.findOneAndRemove({ userId })
		.exec()
		.then(() => {
			return Token.create({ tokenId, userId })
		})
}

module.exports = {
	generateAccessToken,
	generateRefreshToken,
	replaceDbRefreshToken,
}
