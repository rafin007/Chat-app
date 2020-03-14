import * as actionTypes from './actionTypes';

export const joinUser = (user) => {
    return {
        type: actionTypes.JOIN_USER,
        user
    };
};