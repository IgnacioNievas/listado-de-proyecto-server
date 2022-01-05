const express = require('express');
const cors = require('cors');
const dbConnection = require('../db/db.config');

class Server {
	constructor() {
		this.port = process.env.PORT;
		this.userPath = '/api/user';
		this.authPath = '/api/auth';
		this.proyectoPath = '/api/proyectos';
		this.taskPath = '/api/tareas';
		this.app = express();
		this.dbConnect();
		this.middleware();
		this.route();
	}

	middleware() {
		this.app.use(cors());
		this.app.use(express.json());
	}

	async dbConnect() {
		await dbConnection();
	}

	route() {
		this.app.use(this.userPath, require('../routes/user.route'));
		this.app.use(this.authPath, require('../routes/auth.route'));
		this.app.use(this.proyectoPath, require('../routes/proyecto.route'));
		this.app.use(this.taskPath, require('../routes/task.route'));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`se iniciado el server en el puerto ${this.port}`);
		});
	}
}

module.exports = Server;
