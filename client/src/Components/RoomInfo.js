import React from 'react';
import '../index.scss';

const RoomInfo = props => (
    <div className="room-name blue-grey">
        <span className="flow-text white-text room"><em>{props.room && props.room.toUpperCase()}</em></span>
        <span className="flow-text white-text"><em>{props.users.length > 1 ? `${props.users.length} active users` : `${props.users.length} active user`}</em></span>
    </div>
);

export default RoomInfo;