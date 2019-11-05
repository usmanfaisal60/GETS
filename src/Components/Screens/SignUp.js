import React from 'react';
import { View, StyleSheet, StatusBar, Text, Dimensions, Image, BackHandler, Alert } from 'react-native';
import { attemptSigUp, setCredential, clearError, clearFields } from '../../redux/actions';
import { connect } from 'react-redux';
import SignupTextInput from './Helpers/SignupTextInput';
import CustomButton from './Helpers/CustomButton';
import constants from '../../constants';
import SignupPicker from './Helpers/SignupPicker';
import FullScreenModal from './Helpers/FullScreenModal';
import BottomButton from './Helpers/BottomButton';
import cities from '../../Assets/data.json'

class SignUp extends React.Component {

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.clearError();
            this.props.clearFields();
            return false;
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    render() {

        const {
            set_name,
            set_phone_num,
            set_city,
            set_iqama_num,
            set_region,
            set_role
        } = constants.red_types;

        const {
            container,
            imageStyle,
            descriptionStyle,
        } = Styles;

        const {
            setCredential,
            attemptSigUp,
            name,
            phoneNum,
            iqamaNum,
            city,
            region,
            loader,
            role,
            error,
            clearError,
            navigation,
            clearFields
        } = this.props;

        const regions_names = [
            ['Riyadh', 'Riyadh'],
            ['Makkah', 'Makkah'],
            ['Madinah', 'Madinah'],
            ['Qassim', 'Qassim'],
            ['Eastern Province', 'Eastern_Province'],
            ['Asir', 'Asir'],
            ['Tabuk', 'Tabuk'],
            ['Hail', 'Hail'],
            ['Northern Borders', 'Northern_Borders'],
            ['Jizan', 'Jizan'],
            ['Najran', 'Najran'],
            ['Bahah', 'Bahah'],
            ['Jawf', 'Jawf']
        ]

        const cities_names = region !== 'select' ? cities[region].map(el => {
            return [el.asciiname, el.asciiname.replace(' ', '_')];
        }) : null;

        const role_data = [
            ['Regional admin', 'regional_admin'],
            ['Team Leader', 'team_leader']
        ];

        if (error) {
            if (error.type) {
                if (error.type === 'record_found')
                    Alert.alert(
                        'Record Found',
                        error.message,
                        [
                            {
                                text: 'Cancel', onPress: clearError
                            },
                            {
                                text: 'Go to Login Page', onPress: () => {
                                    clearError();
                                    clearFields();
                                    navigation.goBack();
                                }
                            }
                        ]
                    )
                else Alert.alert(
                    error.type,
                    error.message,
                    [
                        {
                            text: 'OK', onPress: () => {
                                clearError();
                                if (error.type != 'No connection') {
                                    clearFields();
                                    navigation.goBack();
                                }
                            }
                        }
                    ]
                )

            }
        }

        return (
            <View style={container}>
                <StatusBar backgroundColor='#eee' barStyle='dark-content' />
                <Image
                    source={require('../../Assets/logo.png')}
                    style={imageStyle}
                    resizeMode='contain' />
                <Text style={descriptionStyle}>Registration</Text>
                <SignupPicker
                    icon='role'
                    value={role}
                    data={role_data}
                    onValueChange={setCredential.bind(this, set_role)} />
                <SignupTextInput
                    icon='fullname'
                    placeholder='Full name'
                    value={name}
                    onChangeText={setCredential.bind(this, set_name)} />
                <SignupTextInput
                    icon='phnum'
                    textContentType='telephoneNumber'
                    placeholder='Phone number'
                    value={phoneNum}
                    onChangeText={setCredential.bind(this, set_phone_num)} />
                <SignupTextInput
                    icon='iqama'
                    textContentType='telephoneNumber'
                    placeholder='Iqama number'
                    value={iqamaNum}
                    onChangeText={setCredential.bind(this, set_iqama_num)} />
                <SignupPicker
                    icon='region'
                    value={region}
                    data={regions_names}
                    onValueChange={setCredential.bind(this, set_region)} />
                {cities_names ? <SignupPicker
                    icon='city'
                    value={city}
                    data={cities_names}
                    last
                    onValueChange={setCredential.bind(this, set_city)} /> : null}
                {city !== 'select' ? <CustomButton onPress={attemptSigUp.bind(this, name, phoneNum, iqamaNum, city, region, role)}>
                    Request Approval
                </CustomButton> : null}
                <BottomButton
                    onPress={() => {
                        clearFields();
                        navigation.goBack();
                    }}
                    label='Already have an account?'>
                    Login
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
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    imageStyle: {
        width: Dimensions.get('window').width * 0.3,
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

export default connect(mapStateToProps, { attemptSigUp, setCredential, clearError, clearFields })(SignUp);