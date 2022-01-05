const { Schema, model } = require('mongoose');

const proyectosNuevos = Schema({
	nombre: {
		type: String,
		required: true,
		trim: true,
	},
	creador: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	creado: {
		type: Date,
		default: Date.now(),
	},
	state: {
		type: Boolean,
		default: true,
	},
});

proyectosNuevos.methods.toJSON = function () {
	const { __v, ...proyecto } = this.toObject();

	return proyecto;
};

module.exports = model('Proyecto', proyectosNuevos);
