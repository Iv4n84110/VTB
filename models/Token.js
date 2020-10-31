const { Schema, model, Types } = require('mongoose')

const shema = new Schema({
	tokenId: { type: String },
	userId: { type: String },
})

module.exports = model('Token', shema)
