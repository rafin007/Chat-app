import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../index.scss';

import * as actions from '../store/actions/user';

const Join = props => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const [error, setError] = useState('')

    const history = useHistory();
    const dispatch = useDispatch();

    const submitForm = () => {
        if (name !== '' && room !== '') {
            dispatch(actions.joinUser({ name, room }));
            history.push('/chat');
        }
    };

    useEffect(() => {
        setError(props.location.state);
    }, [props.location.state]);

    return (
        <div className="valign-wrapper form blue-grey darken-4" >
            <div style={{ width: '100%' }}>
                <div className="container">
                    <div className="row">
                        <div className="col s12 m6 offset-m3">
                            <div className="card blue-grey darken-3">
                                <div className="card-content">
                                    <span className="card-title white-text">Join a room</span>
                                    <form>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="name" type="text" className="white-text" onChange={(event) => setName(event.target.value)} />
                                                <label htmlFor="name" className="active white-text">Your Name</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="room" type="text" className="white-text" onChange={(event) => setRoom(event.target.value)} />
                                                <label htmlFor="room" className="active white-text">Room name</label>
                                            </div>
                                        </div>
                                    </form>
                                    <p className="errorMessage center-align flow-text" >{error}</p>
                                </div>
                                <div className="card-action">
                                    <div className="button-div">
                                        <button to="/chat" className="btn black-text blue-grey lighten-5" onClick={submitForm} >Join</button>
                                    </div>
                                </div>
                            </div>
                            <p className="credit-text center-align grey-text">Created by Arefin Mehedi</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Join;