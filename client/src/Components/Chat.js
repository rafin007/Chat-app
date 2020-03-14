import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import '../index.scss';

const Chat = props => {

    const user = useSelector(state => state.user);

    let redirect = null;

    if (_.isEmpty(user)) {
        redirect = <Redirect to="/" />
    };

    return (
        <div className="Chat" >
            {redirect}
            <button className="btn" >Some button</button>
        </div>
    );
};

export default Chat;