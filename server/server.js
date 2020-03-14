const express = require('express');
const socketio = require('socket.io');
const http = require('http');

//basic setup
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 5000;

const router = require('./routes/router');

//init middleware
app.use(express.json({ extended: false }));

//get the router
app.use(router);





server.listen(PORT, () => console.log(`Server running on port ${PORT}`));