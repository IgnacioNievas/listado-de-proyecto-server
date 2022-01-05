const { Schema, model } = require('mongoose');

const tasksNuevos = Schema({
	nombre: {
		type: String,
		required: true,
		trim: true,
	},
	completado: {
		type: Boolean,
		default: false,
	},
	creada: {
		type: Date,
		default: Date.now(),
	},
	proyecto: {
		type: Schema.Types.ObjectId,
		ref: 'Proyecto',
	},
	state: {
		type: Boolean,
		default: true,
	},
});

tasksNuevos.methods.toJSON = function () {
	const { __v, ...resto } = this.toObject();
	return resto;
};

module.exports = model('Task', tasksNuevos);
