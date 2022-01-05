const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, tokenValido } = require('../middleware/validadores');
const { authPost, authGet } = require('../controller/auth.controller');
const { emialNoExistente } = require('../helpers/db.validator');
const route = Router();
route.get('/', tokenValido, authGet);
route.post(
	'/',
	[check('email').custom(emialNoExistente), validarCampos],
	authPost
);

module.exports = route;
