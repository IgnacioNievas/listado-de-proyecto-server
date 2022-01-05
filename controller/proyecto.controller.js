const Proyecto = require('../module/model.proyectos');

const getProyecto = async (req, res) => {
	try {
		const query = { creador: req.user.id, state: true };
		const [total, proyecto] = await Promise.all([
			Proyecto.countDocuments(query),
			Proyecto.find(query).sort({
				creado: -1,
			}),
		]);

		res.json({ total, proyecto });
	} catch (error) {
		console.log(error);
		res.status(500).send('hubo un error');
	}
};

const getProyectoState = async (req, res) => {
	try {
		const { creador } = req.params;
		const query = { creador };
		const proyecto = await Proyecto.find(query).sort({
			creado: -1,
		});

		res.json({ proyecto });
	} catch (error) {
		console.log(error);
		res.status(500).send('hubo un error');
	}
};

const postProyecto = async (req, res) => {
	try {
		const proyecto = new Proyecto(req.body);
		proyecto.creador = req.user.id;

		await proyecto.save();

		res.json(proyecto);
	} catch (error) {
		console.log(error);
		res.status(500).send('hubo un error');
	}
};

const putProyecto = async (req, res) => {
	const { nombre, state } = req.body;

	const nuevoProyecto = {};
	nuevoProyecto.nombre = nombre;

	if (state === false) {
		nuevoProyecto.state = true;
	}

	try {
		const { id } = req.params;

		let proyecto = await Proyecto.findById(id);

		if (proyecto.creador.toString() !== req.user.id) {
			res
				.status(401)
				.send(
					` el creador N° Id: ${proyecto.creador} no tiene permiso autorizado`
				);
			return;
		}
		proyecto = await Proyecto.findByIdAndUpdate(
			id,
			{ $set: nuevoProyecto },
			{ new: true }
		);
		res.json(proyecto);
	} catch (error) {
		return res.status(500).send('Error en el servidor');
	}
};

const eliminarProyecto = async (req, res) => {
	try {
		const { id } = req.params;
		let proyecto = await Proyecto.findById(id);

		if (proyecto.creador.toString() !== req.user.id) {
			res
				.status(401)
				.send(
					` el creador  N° Id: ${proyecto.creador} no tiene permiso autorizado`
				);
			return;
		}
		proyecto = await Proyecto.findByIdAndUpdate(id, { state: false });

		const { nombre } = proyecto;
		res.json(` el proyecto : ${nombre} ha sido eliminado `);
	} catch (error) {
		return res.status(500).send('Error en el servidor');
	}
};

module.exports = {
	getProyecto,
	postProyecto,
	putProyecto,
	eliminarProyecto,
	getProyectoState,
};
