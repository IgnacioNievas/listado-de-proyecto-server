const { Router } = require('express');
const { check } = require('express-validator');

const postNuevaCuenta = require('../controller/user.controller');
const { emialExistente } = require('../helpers/db.validator');

const { validarCampos } = require('../middleware/validadores');

const route = Router();

route.post(
	'/',
	[
		check('nombre', 'es requerido el nombre').not().isEmpty(),
		check('email', 'el email no es valido').isEmail(),
		check('email').custom(emialExistente),
		check('password', 'la contraseña es requerida').not().isEmpty(),
		check('password', 'tiene que ser mayor de 6 caracteres').isLength({
			min: 6,
		}),
		validarCampos,
	],
	postNuevaCuenta
);

module.exports = route;
