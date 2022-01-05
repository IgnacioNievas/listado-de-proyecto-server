const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../module/model.user');

const postNuevaCuenta = async (req, res) => {
	const { password } = req.body;
	try {
		const user = new User(req.body);

		const salt = bcryptjs.genSaltSync();
		user.password = bcryptjs.hashSync(password, salt);

		await user.save();

		const playload = {
			user: { id: user.id },
		};

		jwt.sign(
			playload,
			process.env.CLAVE,
			{ expiresIn: 3600 },
			(error, token) => {
				if (error) throw error;
				res.json({ access_token: token, expiresIn: 3600 });
			}
		);
	} catch (error) {
		console.log(error);
	}
};

module.exports = postNuevaCuenta;
