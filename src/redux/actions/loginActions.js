import axios from 'axios'
import constants from '../../constants'
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


const {
    set_loader_visibility,
    set_error,
    clear_fields,
    set_user_model
} = constants.red_types;

export const attemptSigUp = (full_name, phone_number, iqama_number, city, reigion, role) => {
    return async dispatch => {

        const postData = {
            full_name,
            phone_number,
            iqama_number,
            city,
            reigion,
            role_type: role
        }

        if (full_name && phone_number.length === 12 && iqama_number.length === 10 && city !== 'select' && reigion !== 'select' && role !== 'select') {

            showloader(dispatch);

            let formData = new FormData();

            for (let key in postData) {
                formData.append(`${key}`, postData[key]);
            }

            try {
                const result = await axios.post(`${constants.baseUrl}/Main_api/user_registration`,
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

                console.log(result);

                if (result.data.message === 'Phone number OR Iqama number already exist') {
                    dispatch({
                        type: set_error,
                        payload: {
                            type: 'record_found',
                            message: 'Your record already exists in our server. If you have an account, please go to login page, else contact your manager for approval of your account'
                        }
                    });
                }
                else {
                    dispatch({
                        type: set_error,
                        payload: {
                            type: 'Success',
                            message: 'You have been successfully registered to GETS. Kindly wait for your manager to approve your request'
                        }
                    });
                }

            } catch (e) {
                console.log(e);
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
        else {
            Alert.alert(
                'Data validation error',
                'Please select all the values appropriately\nThe iqama number should be 10 digits\nThe phone number shoudl be 12 digits starting with area code and should not contain + at the start',
                [
                    {
                        text: 'Ok'
                    }
                ]
            )
        }

    }
}

export const attemptLogin = (phone_number, password) => {
    return async dispatch => {

        const postData = {
            phone_number,
            password
        }

        showloader(dispatch);

        let formData = new FormData();

        for (let key in postData) {
            formData.append(`${key}`, postData[key]);
        }

        try {
            const result = await axios.post(`${constants.baseUrl}/Main_api/login`,
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

            console.log(result);

            if (!result.data.login) {
                dispatch({
                    type: set_error,
                    payload: {
                        type: 'Login failed',
                        message: 'Unable to login. Please check your credential\nIf you think this is a mistake, kindly contact to your higher management\nIf you are new to GETS, please sign up'
                    }
                });
                return;
            }

            await AsyncStorage.setItem('user_model', JSON.stringify(result.data.user_model));

            dispatch({
                type: set_user_model,
                payload: result.data.user_model
            });
        }
        catch (e) {
            hideloader(dispatch);
            console.log(e);
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



export const setCredential = (type, payload) => {
    return {
        type,
        payload
    }
};

export const clearError = () => {
    return {
        type: set_error,
        payload: null
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

export const clearFields = () => {
    return {
        type: clear_fields,
        payload: null
    }
}