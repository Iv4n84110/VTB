const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const Auth = require('../middleware/auth.middleware')
const isAdmin = require('../middleware/isAdmin.middleware')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const router = Router()

router.post('/delete', Auth, isAdmin, async (req, res) => {
	try {
		const { id } = req.body
		const user = await User.findById(id)

		if (!user) {
			res.status(404).json({
				message: 'Пользователь не найден',
			})
		}

		await User.deleteOne(user)

		res.status(200).json({
			message: 'Пользователь был успешно удален!',
		})
	} catch (e) {
		console.log(e)
		res.status(500).json({
			message: 'Что-то пошло не так, попробуйте снова.',
		})
	}
})

router.post('/block', Auth, isAdmin, async (req, res) => {
	try {
		const { id } = req.body
		const user = await User.findById(id)

		if (!user) {
			res.status(404).json({
				message: 'Пользователь не найден',
			})
		}

		user.isActive = false

		await user.save()

		res.status(200).json({
			message: `${user.login} был успешно заблокирован`,
		})
	} catch (e) {
		console.log(e)
		res.status(500).json({
			message: 'Что-то пошло не так, попробуйте снова.',
		})
	}
})

router.post('/unblock', Auth, isAdmin, async (req, res) => {
	try {
		const { id } = req.body
		const user = await User.findById(id)

		if (!user) {
			return res.status(404).json({
				message: 'Пользователь не найден',
			})
		}

		user.isActive = true

		await user.save()

		res.status(200).json({
			message: `${user.login} был успешно разблокирован`,
		})
	} catch (e) {
		console.log(e)
		res.status(500).json({
			message: 'Что-то пошло не так, попробуйте снова.',
		})
	}
})

router.post(
	'/create',
	Auth,
	isAdmin,
	[
		check('login', 'Некорректный login').isLength({
			min: 3,
		}),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty())
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некорректные данные при создание пользователя',
				})

			const { login } = req.body
			const candidate = await User.findOne({ login })

			if (candidate) {
				return res.status(400).json({
					message: 'Такой пользователь уже существует',
				})
			}

			const sault = crypto.randomBytes(64).toString('base64')
			const cryptString = crypto.randomBytes(64).toString('base64')
			const refreshToken = 'test'

			const newUser = new User({
				login,
				sault,
				cryptString,
				isAdmin: false,
				needToChangePassword: true,
				isActive: true,
				refreshToken,
			})
			await newUser.save()
			res.status(201).json({ message: 'Пользователь создан' })
		} catch (e) {
			console.log(e)
			res.status(500).json({
				message: 'Что-то пошло не так, попробуйте снова.',
			})
		}
	}
)

router.get('/get-all', Auth, isAdmin, async (req, res) => {
	try {
		const users = await User.find().where('isAdmin').equals(false)

		const transformedUsers = users.map((user) => ({
			login: user.login,
			id: user._id,
			needToChangePassword: user.needToChangePassword,
			isActive: user.isActive,
		}))

		res.status(200).json(transformedUsers)
	} catch (e) {
		console.log(e)
		res.status(500).json({
			message: 'Что-то пошло не так, попробуйте снова.',
		})
	}
})

router.get('/get-info', Auth, isAdmin, async (req, res) => {
	try {
		const user = await User.findById(req.user.id)

		if (!user) {
			res.status(404).json({
				message: 'Пользователь не найден',
			})
		}

		res.status(200).json({
			login: user.login,
		})
	} catch (e) {
		res.status(500).json({
			message: 'Что-то пошло не так, попробуйте снова.',
		})
	}
})
module.exports = router
