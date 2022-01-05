const mongoose = require('mongoose');

const dbConnection = async () => {
	const db = process.env.MONGO_ATLAS;
	try {
		await mongoose.connect(db);
		console.log('conexion correcta');
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

module.exports = dbConnection;
