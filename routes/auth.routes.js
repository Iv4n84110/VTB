const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { Types } = require('mongoose')

router.post(
	'/register',
	[
		check('login', 'Некорректный login').isLength({
			min: 3,
		}),
		check('password', 'Минимальная длина пароля 6 символов').isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty())
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некорректные данные при регистрации',
				})

			const { login, password } = req.body
			const user = await User.findOne({ login })

			if (!user) {
				return res.status(404).json({
					message: 'Нет такого пользователя',
				})
			}

			const hashedPassword = await bcrypt.hash(password, 12)
			user.password = hashedPassword
			user.needToChangePassword = false

			await user.save()
			res.status(201).json({ message: 'Пароль установлен!' })
		} catch (e) {
			res.status(500).json({
				message: 'Что-то пошло не так, попробуйте снова.',
			})
		}
	}
)

router.post(
	'/login',
	[
		check('login', 'Введите корректный login').exists(),
		check('password', 'Введите пароль').exists(),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty())
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некорректные данные при входе в систему',
				})

			const { login, password } = req.body
			const user = await User.findOne({ login })

			if (!user)
				return res.status(400).json({
					message: 'Ошибка в логине или пароле. Попробуйте, пожалуйста, снова',
				})

			const isMatch = await bcrypt.compare(password, user.password)

			if (!isMatch)
				return res.status(400).json({
					message: 'Ошибка в логине или пароле. Попробуйте, пожалуйста, снова',
				})

			const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
				expiresIn: '10h',
			})

			res.status(200).json({
				token,
				userId: user.id,
			})
		} catch (e) {
			res.status(500).json({
				message: 'Что-то пошло не так, попробуйте снова.',
			})
		}
	}
)

module.exports = router
