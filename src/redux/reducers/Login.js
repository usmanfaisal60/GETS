import constants from '../../constants';

const {
    set_name,
    set_city,
    set_pass,
    set_phone_num,
    set_region,
    set_iqama_num,
    clear_fields,
    set_role,
    set_user_model
} = constants.red_types;

const initial_state = {
    name: '',
    pass: '',
    iqamaNum: '',
    phoneNum: '',
    city: 'select',
    region: 'select',
    role: 'select',
    user_model: null
}

const LoginReducers = (state = initial_state, action) => {
    switch (action.type) {
        case set_name:
            return {
                ...state, name: action.payload
            }
        case set_pass:
            return {
                ...state, pass: action.payload
            }
        case set_iqama_num:
            return {
                ...state, iqamaNum: action.payload
            }
        case set_phone_num:
            return {
                ...state, phoneNum: action.payload
            }
        case set_city:
            return {
                ...state, city: action.payload
            }
        case set_region:
            return {
                ...state, region: action.payload
            }
        case set_role:
            return {
                ...state, role: action.payload
            }
        case set_user_model:
            return {
                ...state, user_model: action.payload
            }
        case clear_fields:
            return initial_state
        default:
            return state;
    }
};

export default LoginReducers;