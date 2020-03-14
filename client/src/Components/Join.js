import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../index.scss';

import * as actions from '../store/actions/user';

const Join = props => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const history = useHistory();
    const dispatch = useDispatch();

    const submitForm = () => {
        if (name !== '' && room !== '') {
            dispatch(actions.joinUser({ name, room }));
            history.push('/chat');
        }
    };

    return (
        <div className="valign-wrapper form cyan lighten-5" >
            <div style={{ width: '100%' }}>
                <div className="container">
                    <div className="row">
                        <div className="col s12 m6 offset-m3">
                            <div className="card">
                                <div className="card-content">
                                    <span className="card-title black-text">Join a room</span>
                                    <form>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="name" type="text" onChange={(event) => setName(event.target.value)} />
                                                <label htmlFor="name" className="active">Your Name</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="room" type="text" onChange={(event) => setRoom(event.target.value)} />
                                                <label htmlFor="room" className="active">Room name</label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-action">
                                    <button to="/chat" className="btn" onClick={submitForm} >Join</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Join;