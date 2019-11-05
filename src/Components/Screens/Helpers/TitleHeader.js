import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const Template = props => {

    const {
        container,
        iconStyle,
        textStyle
    } = Styles;

    const {
        icon,
        children
    } =props;

    return (
        <View style={container}>
            <Image source={icons[icon]} style={iconStyle} resizeMode='contain'/>
            <Text style={textStyle}>{children}</Text>
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
    container: {
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    iconStyle: {
        height: win_width / 5,
        width: win_width / 5,
    },

    textStyle: {
        fontSize: 25,
        padding: 5
    }
});

export default Template;