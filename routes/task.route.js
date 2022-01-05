const { Router } = require('express');
const { check } = require('express-validator');
const {
	getTask,
	getTaskState,
	postTask,
	putTask,
	eliminarTask,
} = require('../controller/task.controller');
const { validarCampos, tokenValido } = require('../middleware/validadores');
const {
	proyectoId_tareExiste,
	idTaskExiste,
} = require('../helpers/db.validator');

const route = Router();

route.get('/', getTask);

route.get('/:proyecto', getTaskState);

route.post(
	'/',
	tokenValido,
	[
		check('nombre', 'campo obligatorio').not().isEmpty(),
		check('proyecto', 'no es un id de la base de datos de mongoDB').isMongoId(),
		check('proyecto').custom(proyectoId_tareExiste),
		validarCampos,
	],
	postTask
);

route.put(
	'/:id',
	tokenValido,
	[
		check('id', 'no es un id de la base de datos de mongoDB').isMongoId(),
		check('id').custom(idTaskExiste),
		validarCampos,
	],
	putTask
);

route.delete(
	'/:proyecto/:id',
	tokenValido,
	[
		check('id', 'no es un id de la base de datos de mongoDB').isMongoId(),
		check('id').custom(idTaskExiste),
		validarCampos,
	],
	eliminarTask
);

module.exports = route;
