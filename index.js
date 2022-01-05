require('dotenv').config();
const Server = require('./module/server');

const server = new Server();

server.listen();
