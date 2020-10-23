const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const Auth = require('../middleware/auth.middleware')
const isAdmin = require('../middleware/isAdmin.middleware')
const crypto = require('crypto')

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

router.post('/create', Auth, isAdmin,
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

			const newUser = new User({
				login,
				sault,
				cryptString,
				isAdmin: false,
				needToChangePassword: true,
				isActive: false,
			})
			await newUser.save()
			res.status(201).json({ message: 'Пользователь создан' })
		} catch (e) {
			res.status(500).json({
				message: 'Что-то пошло не так, попробуйте снова.',
			})
		}
	}
)


module.exports = router
