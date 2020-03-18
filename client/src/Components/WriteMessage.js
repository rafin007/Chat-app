import React, { Fragment } from 'react';
import '../index.scss';

const WriteMessage = props => {

    // const [message, setMessage] = useState('');

    // const input = useRef(null);

    // useEffect(() => {
    //     input.current.focus();
    // }, [props.message]);

    // const [showTyping, setShowTyping] = useState(false);

    // useEffect(() => {
    //     if (props.typing !== '') {
    //         setShowTyping(true);
    //     }
    //     else {
    //         setShowTyping(false);
    //     }
    // }, [props.typing]);


    return (
        <Fragment>
            {/* <p className="white-text" >{props.typing !== '' ? props.typing : null}</p> */}
            <div className="input-field col s9 write-message">
                <textarea placeholder="Write message..." type="text" className="white-text materialize-textarea" onChange={(event) => props.setMessage(event.target.value)} value={props.message} onKeyPress={(event) => event.key === "Enter" && props.sendMessage()} />
            </div>
            <div className="col s2 send-button" onClick={props.sendMessage}>
                <i className="material-icons white-text small">send</i>
            </div>
        </Fragment>
    );
};

export default WriteMessage;