const bcrptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../module/model.user');

const authGet = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		res.json({ user });
	} catch (error) {
		console.log(error);
		res.status(500).send('se produjo un error');
	}
};

const authPost = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });

		const passwordCorrect = await bcrptjs.compare(password, user.password);
		if (!passwordCorrect) {
			return res
				.status(400)
				.json({ errors: [{ msg: `la contraseña ${password} es incorrecta` }] });
		}

		const payload = {
			user: { id: user.id },
		};

		jwt.sign(
			payload,
			process.env.CLAVE,
			{ expiresIn: 3600 },
			(error, token) => {
				if (error) throw error;

				res.json({ access_token: token, expiresIn: 3600 });
			}
		);
	} catch (er) {
		console.log(er);
	}
};

module.exports = { authPost, authGet };
