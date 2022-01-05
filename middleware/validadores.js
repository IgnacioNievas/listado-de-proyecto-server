const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const validarCampos = (req, res, next) => {
	const er = validationResult(req);
	if (!er.isEmpty()) {
		return res.status(400).json(er);
	}
	next();
};

const tokenValido = (req, res, next) => {
	const token = req.get('x-auth-token');

	if (!token) {
		return res.status(401).send({ msg: 'no hay token , permiso no valido' });
	}

	try {
		const cifrado = jwt.verify(token, process.env.CLAVE);

		//viene del payload
		req.user = cifrado.user;
		next();
	} catch (error) {
		console.log(error);
		res.status(401).send({ msg: 'token no valido' });
	}
};

module.exports = {
	validarCampos,
	tokenValido,
};
