import React, { memo } from 'react';
import moment from 'moment';
import '../index.scss';

const MessageReceiver = props => {

    const time = moment(new Date()).format('ddd h:mm A');

    return (
        <div className="message">
            <span className="white-text" ><em>{props.sender}</em></span>
            <span className="blue-grey-text" >{time}</span>
            <div className="message-receiver blue-grey lighten-5 col s4">
                <p className="flow-text" >{props.message}</p>
            </div>
        </div>
    );
};

export default memo(MessageReceiver, () => true);