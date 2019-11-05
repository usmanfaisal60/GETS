import constants from '../../constants';
const initial_state = {
    loader: false,
    error: null
}

const {
    set_loader_visibility,
    set_error
} = constants.red_types;

const loader = (state = initial_state, action) => {
    switch (action.type) {
        case set_loader_visibility:
            return {
                ...state, loader: action.payload
            }
        case set_error:
            return {
                ...state, error: action.payload
            }
        default:
            return state;
    }
}

export default loader;