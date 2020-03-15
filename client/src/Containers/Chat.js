import React, { useEffect, useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import _ from 'lodash';

import '../index.scss';

const Chat = props => {

    const user = useSelector(state => state.user);

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);


    const socket = useRef(null);

    let redirect = null;

    if (_.isEmpty(user)) {
        redirect = <Redirect to="/" />;
    }

    const ENDPOINT = 'http://localhost:5000';

    //get connection
    useEffect(() => {

        socket.current = io(ENDPOINT);

        const name = user.name;
        const room = user.room;

        socket.current.emit('join', { name, room }, () => {

        });

        return () => {
            socket.current.emit('disconnect');
            socket.current.off();
        }
    }, [ENDPOINT, user]);


    //keep track of messages
    useEffect(() => {
        socket.current.on('message', message => {
            setMessages([...messages, message]);
        });
    }, [messages, socket]);

    //send message
    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.current.emit('sendMessage', message, () => {
                setMessage('');
            });
        }
    }

    console.log(message, messages);

    return (
        <div className="Chat" >
            {redirect}
            <input type="text" onChange={(event) => setMessage(event.target.value)} onKeyPress={(event) => event.key === 'Enter' && sendMessage(event)} />
        </div>
    );
};

export default Chat;