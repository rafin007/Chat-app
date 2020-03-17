import React from 'react';
import '../index.scss';

const RoomInfo = props => (
    <div className="room-name blue-grey">
        <p className="flow-text center-align white-text">{props.room}</p>
    </div>
);

export default RoomInfo;