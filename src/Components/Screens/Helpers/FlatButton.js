import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableNativeFeedback } from 'react-native';

const FlatButton = props => {

    const {
        buttonContainer,
        buttonContainerInner,
        iconStyle,
        textStyle
    } = Styles;

    const {
        icon,
        children,
        backgroundColor,
        onPress
    } = props;

    return (
        <View style={buttonContainer}>
            <TouchableNativeFeedback onPress={() => { if (onPress) onPress() }}>
                <View style={{ ...buttonContainerInner, backgroundColor }}>
                    <Image source={icons[icon]} style={iconStyle} resizeMode='contain' />
                    <Text style={textStyle}>{children}</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
};

const icons = {
    approval: require('../../../Assets/buttonsIcons/approval.png'),
    profile: require('../../../Assets/buttonsIcons/profile.png'),
    find_member: require('../../../Assets/buttonsIcons/find_member.png'),
    regional_admin: require('../../../Assets/buttonsIcons/regional_admin.png'),

}

const win_width = Dimensions.get('window').width;

const Styles = StyleSheet.create({
    buttonContainer: {
        width: win_width / 2,
        height: '100%',
        padding: 10
    },

    buttonContainerInner: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        elevation: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    iconStyle: {
        height: win_width / 6,
        width: win_width / 6,
    },

    textStyle: {
        color: '#fff',
        fontSize: 18,
        padding: 5
    }
});

export default FlatButton;

