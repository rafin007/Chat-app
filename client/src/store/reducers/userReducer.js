import * as actionTypes from '../actions/actionTypes';

const initialState = {
    user: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.JOIN_USER:
            return {
                ...state,
                user: { ...action.user }
            }

        default:
            return state;
    }
};

export default reducer;