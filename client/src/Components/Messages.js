import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import ReactEmoji from 'react-emoji';
import '../index.scss';

import MessageSender from './MessageSender';
import MessageReceiver from './MessageReceiver';

const Messages = props => {

    // console.log(props.user);

    return (
        <div className="messages">
            <ScrollToBottom className="scroller">
                {/* check who sent the message */}
                {props.messages.map((message, i) => props.user.toLowerCase() === message.user ? <MessageSender time={message.timestamp} message={ReactEmoji.emojify(message.text)} key={i} sender={message.user} /> : <MessageReceiver time={message.timestamp} message={ReactEmoji.emojify(message.text)} key={i} sender={message.user} />)}
            </ScrollToBottom>
        </div>
    );
};

export default Messages;
