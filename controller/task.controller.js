const Task = require('../module/model.task');
const Proyecto = require('../module/model.proyectos');

const getTask = async (req, res) => {
	try {
		const { proyecto } = req.query;
		const query = { proyecto, state: true };
		const [total, task] = await Promise.all([
			Task.countDocuments(query),
			Task.find(query),
		]);
		res.json({ total, task });
	} catch (error) {
		console.log(error);
		return res.status(500).send('Ocurrio un error');
	}
};

const getTaskState = async (req, res) => {
	try {
		const { proyecto } = req.params;

		const task = await Task.find({ proyecto });

		res.json(task);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Ocurrio un error');
	}
};

const postTask = async (req, res) => {
	try {
		const { proyecto } = req.body;

		const existeProyecto = await Proyecto.findById(proyecto);

		if (existeProyecto.creador.toString() !== req.user.id) {
			res
				.status(401)
				.send(
					` el creador con el Id : ${existeProyecto.creador} no tiene permiso autorizado`
				);
			return;
		}

		const task = new Task(req.body);

		await task.save();
		res.json(task);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Ocurrio un error');
	}
};
const putTask = async (req, res) => {
	const { proyecto, nombre, completado, state } = req.body;

	const existeProyecto = await Proyecto.findById(proyecto);

	if (existeProyecto.creador.toString() !== req.user.id) {
		res
			.status(401)
			.send(
				` el creador con el Id : ${existeProyecto.creador} no tiene permiso autorizado`
			);
		return;
	}
	const nuevaTarea = {};
	nuevaTarea.nombre = nombre;
	nuevaTarea.completado = completado;

	nuevaTarea.state = true;

	try {
		const { id } = req.params;
		const tarea = await Task.findOneAndUpdate({ _id: id }, nuevaTarea, {
			new: true,
		});
		res.json(tarea);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Ocurrio un error');
	}
};

const eliminarTask = async (req, res) => {
	const { proyecto, id } = req.params;

	const existeProyecto = await Proyecto.findById(proyecto);

	if (existeProyecto.creador.toString() !== req.user.id) {
		res
			.status(401)
			.send(
				` el creador con el Id : ${existeProyecto.creador} no tiene permiso autorizado`
			);
		return;
	}

	try {
		const query = { state: false };
		const tareaBorrada = await Task.findOneAndUpdate({ _id: id }, query);
		const { nombre } = tareaBorrada;

		res.json(`la tarea ${nombre} ha sido borrada `);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Ocurrio un error');
	}
};

module.exports = {
	getTask,
	getTaskState,
	postTask,
	putTask,
	eliminarTask,
};
