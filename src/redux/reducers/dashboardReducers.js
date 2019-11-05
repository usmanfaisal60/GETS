import constants from '../../constants';
const initial_state = {
    membersData: null
}

const {
    set_members_data
} = constants.red_types;

const dashboard = (state = initial_state, action) => {
    switch (action.type) {
        case set_members_data:
            return {
                ...state, membersData: action.payload
            }
        default:
            return state;
    }
}

export default dashboard;