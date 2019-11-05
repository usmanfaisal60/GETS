import React from 'react';
import { View, StyleSheet, StatusBar, Text, Dimensions, Image, Alert } from 'react-native';
import { attemptLogin, setCredential, clearError } from '../../redux/actions';
import { connect } from 'react-redux';
import SignupTextInput from './Helpers/SignupTextInput';
import CustomButton from './Helpers/CustomButton';
import constants from '../../constants';
import BottomButton from './Helpers/BottomButton';
import FullScreenModal from './Helpers/FullScreenModal';
import AsyncStorage from '@react-native-community/async-storage';


class SignUp extends React.Component {

    async componentDidMount() {
        const {
            setCredential,
        } = this.props;

        const {
            set_user_model
        } = constants.red_types

        try {
            const user_model = await AsyncStorage.getItem('user_model');

            console.log(user_model);

            if (user_model) setCredential(set_user_model, JSON.parse(user_model));

        } catch (e) {
            console.log(e);
        }

    }

    componentDidUpdate() {

        const {
            error,
            clearError,
            user_model,
            navigation
        } = this.props;

        if (user_model) navigation.replace('Dashboard');

        if (error) {
            if (error.type) {
                if (error.type === 'Login failed') {
                    Alert.alert(
                        error.type,
                        error.message,
                        [
                            {
                                text: 'Ok',
                                onPress: () => {
                                    clearError();
                                }
                            },
                            {
                                text: 'Sign Up',
                                onPress: () => {
                                    clearError();
                                    navigation.navigate('SignUp')
                                }
                            }
                        ]
                    )
                } else {
                    Alert.alert(
                        error.type,
                        error.message,
                        [
                            {
                                text: 'Ok',
                                onPress: () => {
                                    clearError();
                                }
                            }
                        ]
                    )
                }
            }
        }
    }

    render() {

        const {
            set_pass,
            set_phone_num,
        } = constants.red_types;

        const {
            container,
            imageStyle,
            descriptionStyle,
        } = Styles;

        const {
            setCredential,
            phoneNum,
            pass,
            navigation,
            loader,
            attemptLogin,
        } = this.props;





        return (
            <View style={container}>
                <StatusBar backgroundColor='#eee' barStyle='dark-content' />
                <Image
                    source={require('../../Assets/logo.png')}
                    style={imageStyle}
                    resizeMode='contain' />
                <Text style={descriptionStyle}>Admin Login</Text>
                <SignupTextInput
                    placeholder='Phone number'
                    value={phoneNum}
                    textContentType='telephoneNumber'
                    onChangeText={setCredential.bind(this, set_phone_num)} />
                <SignupTextInput
                    last
                    secureTextEntry
                    placeholder='Password'
                    value={pass}
                    onChangeText={setCredential.bind(this, set_pass)} />
                <CustomButton
                    blue
                    onPress={attemptLogin.bind(this, phoneNum, pass)}>
                    Login
                </CustomButton>
                <BottomButton
                    onPress={() => navigation.navigate('SignUp')}
                    label='New to GETS?'>
                    SignUp
                </BottomButton>

                {loader ? <FullScreenModal loader /> : null}

            </View>
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Dimensions.get('window').height,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center'
    },

    imageStyle: {
        width: Dimensions.get('window').width * 0.5,
    },

    textInput: {
        borderBottomColor: '#aaa',
        borderBottomWidth: 1,
        width: '80%',
        padding: 2,
        paddingLeft: 10,
        marginBottom: '7%'
    },

    descriptionStyle: {
        padding: 10,
        fontSize: 20,
        fontFamily: 'serif',
        marginBottom: '4%'
    },

    pickerStyle: {
        width: '80%',
        height: '10%'
    }
});

const mapStateToProps = state => {
    return {
        ...state.login,
        ...state.loader
    }
}

export default connect(mapStateToProps, { attemptLogin, setCredential, clearError })(SignUp);