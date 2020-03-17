import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import moment from 'moment';
import '../index.scss';

import MessageSender from './MessageSender';
import MessageReceiver from './MessageReceiver';

const Messages = props => {

    const date = new Date();
    const timestamp = moment(date).format('ddd h:mm A');

    return (
        <div className="messages">
            <ScrollToBottom className="scroller">
                {/* check who sent the message */}
                {props.messages.map((message, i) => props.user === message.user ? <MessageSender time={timestamp} message={message.text} key={i} sender={message.user} /> : <MessageReceiver time={timestamp} message={message.text} key={i} sender={message.user} />)}
            </ScrollToBottom>
        </div>
    );
};

export default Messages;
