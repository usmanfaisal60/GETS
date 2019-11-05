import constants from "../../constants";
import axios from 'axios';

const {
    set_members_data,
    set_error,
    set_loader_visibility,
} = constants.red_types;

export const updateMemberStatus = (agent_id, user_id, status, role_type) => {
    return async dispatch => {

        const postData = {
            agent_id,
            user_id,
            status
        }

        console.log(postData);

        showloader(dispatch);

        let formData = new FormData();

        for (let key in postData) {
            formData.append(`${key}`, postData[key]);
        }

        try {
            const result = await axios.post(`${constants.baseUrl}/Main_api/update_status`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                });

            if (!result) {
                hideloader(dispatch);
                return;
            }

            console.log(result);

            if (result.data.message) {

                const postData2 = {
                    user_id: agent_id,
                    role_type
                }

                let formData2 = new FormData();

                for (let key in postData2) {
                    formData2.append(`${key}`, postData2[key]);
                }

                console.log(formData2);

                const result2 = await axios.post(`${constants.baseUrl}/Main_api/check_status`,
                    formData2,
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        timeout: 10000
                    });

                hideloader(dispatch);

                if (!result2) {
                    return;
                }

                console.log('recieved ', result2.data);

                dispatch({
                    type: set_members_data,
                    payload: result2.data
                });
            } else {
                hideloader(dispatch);
            }
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