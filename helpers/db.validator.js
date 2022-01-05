const User = require('../module/model.user');
const Proyecto = require('../module/model.proyectos');
const Task = require('../module/model.task');

const emialExistente = async (email) => {
	const userEmail = await User.findOne({ email });

	if (userEmail) {
		throw new Error(` el ${email}, ya exite , intente otro email`);
	}
};

const emialNoExistente = async (email) => {
	const userEmail = await User.findOne({ email });

	if (!userEmail) {
		throw new Error(` el ${email} no existe`);
	}
};

const userIDExiste = async (id) => {
	const userId = await User.findById(id);

	if (!userId) {
		throw new Error(` el ${id} no existe en la base de datos`);
	}
};

const idTaskExiste = async (id) => {
	const task = await Task.findById(id);
	if (!task) {
		throw new Error(` el id : ${id} no existe en mongoDB`);
	}
};

const proyectoId_tareExiste = async (proyecto) => {
	const existeProyecto = await Proyecto.findById(proyecto);
	if (!existeProyecto) {
		throw new Error(` el proyecto  con id: ${proyecto} no existe en mongoDB`);
	}
};

const proyectoExiste = async (id) => {
	const proyecto = await Proyecto.findById(id);
	if (!proyecto) {
		throw new Error(` el id : ${id} no existe en mongoDB`);
	}
};

module.exports = {
	emialExistente,
	userIDExiste,
	emialNoExistente,
	proyectoId_tareExiste,
	proyectoExiste,
	idTaskExiste,
};
