const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const moment = require('moment');


const { addUser, removeUser, getUser, getAllUsersOfRoom } = require('./userHelpers/userHelpers');

//basic setup
const app = express();
const server = http.createServer(app);
const io = socketio(server, { wsEngine: 'ws' });

const PORT = process.env.PORT || 5000;

//init middleware
app.use(express.json({ extended: false }));
app.use(cors());

io.on('connection', (socket) => {

    //server generated messages
    socket.on('join', ({ name, room }, callback) => {
        //add the user
        if (!name || !room) {
            return;
        }
        // console.log(name);

        const { error, user } = addUser({ id: socket.id, name, room });

        //if error throw them
        if (error) {
            return callback(error);
        }

        //send a message to the client from server
        socket.emit('message', { user: 'admin', text: `Welcome ${user.name} to ${user.room}.`, timestamp: moment(new Date()).format('ddd h:mm A') });

        //send every other user about that user
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined the chat`, timestamp: moment(new Date()).format('ddd h:mm A') });

        //join the user in the room
        socket.join(user.room);

        //get room info
        io.to(user.room).emit('roomData', { users: getAllUsersOfRoom(user.room) });

        callback();
    });

    // // check user typing
    // socket.on('typing', () => {
    //     const user = getUser(socket.id);
    //     if (user) {
    //         // console.log(`${name} is typing a message...`);
    //         socket.broadcast.to(user.room).emit('userTyping', { text: `${user.name} is typing a message...` });
    //     }
    // });

    socket.on('sendMessage', (message, callback) => {
        //get the user
        const user = getUser(socket.id);

        if (!user) {
            return;
        }

        //send the message from user
        io.to(user.room).emit('message', { user: user.name, text: message, timestamp: moment(new Date()).format('ddd h:mm A') });

        callback();
    });

    socket.on('disconnect', () => {
        const user = getUser(socket.id);
        if (!user) return;
        io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left the chat`, timestamp: moment(new Date()).format('ddd h:mm A') });
        removeUser(socket.id);
        io.to(user.room).emit('roomData', { users: getAllUsersOfRoom(user.room) });
    });
});


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));