import React, { memo } from 'react';
import moment from 'moment';
import '../index.scss';

const MessageSender = props => {

    const time = moment(new Date()).format('ddd h:mm A');

    return (
        <div className="message">
            <span className="white-text right-align" ><em>{props.sender}</em></span>
            <span className="blue-grey-text right-align" >{time}</span>
            <div className="message-sender blue-grey col s4">
                <p className="flow-text white-text" >{props.message}</p>
            </div>
        </div>
    );
};

export default memo(MessageSender, () => true);