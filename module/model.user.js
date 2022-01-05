const { Schema, model } = require('mongoose');

const userSchema = Schema({
	email: {
		type: String,
		requiered: true,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		requiered: true,
		trim: true,
	},

	nombre: {
		type: String,
		requiered: true,
		trim: true,
	},
	registro: {
		type: Date,
		default: Date.now(),
	},
	state: {
		type: Boolean,
		default: true,
	},
	google: {
		type: Boolean,
		default: false,
	},
});

userSchema.methods.toJSON = function () {
	const { __v, state, google, password, ...user } = this.toObject();

	return user;
};

module.exports = model('User', userSchema);
