import React, { Fragment, useState, useRef, useEffect } from 'react';
import '../index.scss';

const WriteMessage = props => {

    // const [message, setMessage] = useState('');

    const input = useRef(null);

    useEffect(() => {
        input.current.focus();
    }, [props.message]);


    return (
        <Fragment>
            <div className="input-field col s9 write-message">
                <textarea placeholder="Write message..." type="text" className="white-text materialize-textarea" onChange={(event) => props.setMessage(event.target.value)} value={props.message} ref={input} onKeyPress={(event) => event.key === "Enter" && props.sendMessage()} />
            </div>
            <div className="col s2 send-button" onClick={props.sendMessage}>
                <i className="material-icons white-text small">send</i>
            </div>
        </Fragment>
    );
};

export default WriteMessage;