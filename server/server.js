const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getAllUsersOfRoom } = require('./userHelpers/userHelpers');

//basic setup
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 5000;

//init middleware
app.use(express.json({ extended: false }));

io.on('connection', (socket) => {

    //server generated messages
    socket.on('join', ({ name, room }, callback) => {
        //add the user
        const { error, user } = addUser({ id: socket.id, name, room });

        //if error throw them
        if (error) {
            return callback(error);
        }

        //send a message to the client from server
        socket.emit('message', { user: 'admin', text: `Welcome ${user.name} to ${user.room}.` });

        //send every other user about that user
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined the chat` });

        //join the user in the room
        socket.join(user.room);

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        //get the user
        const user = getUser(socket.id);


        //send the message from user
        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });

    socket.on('disconnect', () => {
        console.log('user has left');
    });
});



server.listen(PORT, () => console.log(`Server running on port ${PORT}`));