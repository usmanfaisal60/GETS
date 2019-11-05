import constants from '../../constants';
import axios from 'axios';

const {
    set_loader_visibility,
    set_members_data
} = constants.red_types;


export const checkStatus = (user_id, role_type) => {
    return async dispatch => {

        const postData = {
            user_id,
            role_type
        }

        showloader(dispatch);

        let formData = new FormData();

        for (let key in postData) {
            formData.append(`${key}`, postData[key]);
        }

        try {
            const result = await axios.post(`${constants.baseUrl}/Main_api/check_status`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                });

            hideloader(dispatch);

            if (!result) {
                return;
            }

            dispatch({
                type: set_members_data,
                payload: result.data
            });
        }
        catch (e) {
            hideloader(dispatch);
            dispatch({
                type: set_error,
                payload: {
                    type: 'No connection',
                    message: 'It appears as if you are not connected to the internet or our server is down'
                }
            });
            console.log(e);
        }
    }
}

const showloader = dispatch => {
    dispatch({
        type: set_loader_visibility,
        payload: true
    });
}

const hideloader = dispatch => {
    dispatch({
        type: set_loader_visibility,
        payload: false
    });
}