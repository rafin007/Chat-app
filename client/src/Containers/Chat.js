import React, { useEffect, useState, useRef } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import _ from 'lodash';

import RoomInfo from '../Components/RoomInfo';
import Messages from '../Components/Messages';
import WriteMessage from '../Components/WriteMessage';


import '../index.scss';

//create forceUpdate hook
function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

const Chat = props => {

    const user = useSelector(state => state.user);

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const history = useHistory();

    const forceUpdate = useForceUpdate();

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

        socket.current.emit('join', { name, room }, (error) => {
            if (error) {
                history.push('/', error);
            }
        });

        return () => {
            socket.current.emit('disconnect');
            socket.current.off();
        }

    }, [ENDPOINT, user]);


    //keep track of messages
    useEffect(() => {
        socket.current.on('message', message => {
            messages.push(message);
            forceUpdate();
        });
    }, [messages, socket]);

    //send message
    const sendMessage = () => {

        if (message) {
            socket.current.emit('sendMessage', message, () => {
                setMessage('');
            });
        }
    }

    // console.log(message, messages);

    return (
        <div className="chat-container blue-grey darken-4">
            {redirect}
            <RoomInfo room={user.room} />
            <div className="container">
                <div className="row row-element">
                    <Messages messages={messages} user={user.name} />
                    <WriteMessage sendMessage={sendMessage} message={message} setMessage={setMessage} />
                </div>
            </div>
        </div>
    );
};

export default Chat;