const { Router } = require('express');
const { check } = require('express-validator');
const {
	getProyecto,
	getProyectoState,
	postProyecto,
	putProyecto,
	eliminarProyecto,
} = require('../controller/proyecto.controller');
const { validarCampos, tokenValido } = require('../middleware/validadores');

const { proyectoExiste } = require('../helpers/db.validator');

const route = Router();

route.get('/', tokenValido, getProyecto);
route.get('/:creador', tokenValido, getProyectoState);
route.post(
	'/',
	tokenValido,
	[check('nombre', 'debe tener un nombre').not().isEmpty(), validarCampos],
	postProyecto
);

route.put(
	'/:id',
	tokenValido,
	[
		check('nombre', 'debe tener un nombre').not().isEmpty(),
		check('id', 'no es un id de la base de datos de mongoDB').isMongoId(),
		check('id').custom(proyectoExiste),
		validarCampos,
	],
	putProyecto
);

route.delete(
	'/:id',
	tokenValido,
	[
		check('id', 'no es un id de la base de datos de mongoDB').isMongoId(),
		check('id').custom(proyectoExiste),
		validarCampos,
	],
	eliminarProyecto
);
module.exports = route;
