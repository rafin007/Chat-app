import React from 'react';
import '../index.scss';

const MessageSender = props => (
    <div className="message">
        <span className="white-text right-align" ><em>{props.sender}</em></span>
        <span className="blue-grey-text right-align" >{props.time}</span>
        <div className="message-sender blue-grey col s4">
            <p className="flow-text white-text" >{props.message}</p>
        </div>
    </div>
);

export default MessageSender;