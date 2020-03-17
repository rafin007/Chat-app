import React from 'react';
import '../index.scss';

const MessageReceiver = props => (
    <div className="message">
        <span className="white-text" ><em>{props.sender}</em></span>
        <span className="blue-grey-text" >{props.time}</span>
        <div className="message-receiver blue-grey lighten-5 col s4">
            <p className="flow-text" >{props.message}</p>
        </div>
    </div>
);

export default MessageReceiver;