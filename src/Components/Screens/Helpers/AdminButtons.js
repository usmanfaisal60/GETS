import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import FlatButton from './FlatButton';
import AsyncStorage from '@react-native-community/async-storage';


const AdminButtons = props => {

    const {
        container,
        buttonsContainer,
    } = Styles;

    const {
        navigation
    } = props;

    return (
        <ScrollView style={container}>
            <View style={buttonsContainer}>
                <FlatButton backgroundColor='#d4362a' icon='find_member' onPress={() => navigation.navigate('FindMember')}>
                    Find Member
                </FlatButton>
                <FlatButton backgroundColor='#2196f3' icon='regional_admin' onPress={() => navigation.navigate('RegionalAdmins')}>
                    Regional Admins
                </FlatButton>
            </View>
            <View style={buttonsContainer}>
                <FlatButton backgroundColor='#9c27b0' icon='approval' onPress={() => navigation.navigate('RegionalAdminApproval')}>
                    RA Approval
                </FlatButton>
                <FlatButton backgroundColor='#03a9f4' icon='profile' >
                    Profile
                </FlatButton>
            </View>
            <View style={buttonsContainer}>
                <FlatButton backgroundColor='#9c27b0' icon='approval' onPress={async () => {
                    await AsyncStorage.removeItem('user_model');
                    navigation.replace('Login');
                }}>
                    Log out
                </FlatButton>
            </View>
            <View style={{ height: 50 }}></View>
        </ScrollView>
    )
};

const win_width = Dimensions.get('window').width;

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingTop: 15,
    },

    buttonsContainer: {
        height: win_width / 2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }

});

export default AdminButtons;