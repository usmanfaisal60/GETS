import React from 'react';
import { View, Image, TextInput, StyleSheet, Dimensions } from 'react-native';

const SignupTextInput = props => {

    const {
        container,
        imageStyle,
        textInputStyle
    } = Styles;

    const {
        icon,
        placeholder,
        onChangeText,
        value,
        textContentType,
        last,
        secureTextEntry
    } = props;

    const mainPadding = Dimensions.get('window').width * 0.05

    return (
        <View style={{
            ...container, marginBottom: last ? mainPadding * 2 : mainPadding
        }}>
            {icon ? <Image
                source={icons[icon]}
                style={imageStyle}
                resizeMode='contain' /> : null}
            <TextInput
                placeholder={placeholder}
                textContentType={textContentType || 'name'}
                placeholderTextColor='#aaa'
                style={textInputStyle}
                value={value}
                secureTextEntry={secureTextEntry}
                keyboardType={textContentType ? 'number-pad' : 'name-phone-pad'}
                onChangeText={(text) => {
                    if (onChangeText)
                        if ((icon === 'phnum' && text.length <= 12) || (icon === 'iqama' && text.length <= 10)) onChangeText(text);
                        else if (icon !== 'phnum' && icon !== 'iqama') onChangeText(text);
                }} />
        </View>
    )
};

const icons = {
    city: require('../../../Assets/signupicons/city.png'),
    fullname: require('../../../Assets/signupicons/fullname.png'),
    iqama: require('../../../Assets/signupicons/iqama.png'),
    phnum: require('../../../Assets/signupicons/phnum.png'),
    region: require('../../../Assets/signupicons/region.png')
}

const imgSize = Dimensions.get('window').width * 0.08;

const Styles = StyleSheet.create({
    container: {
        width: '90%',
        flexDirection: 'row',
        borderBottomColor: '#aaa',
        borderBottomWidth: 2,
        alignItems: 'center',
    },

    imageStyle: {
        width: imgSize,
        height: imgSize,
        marginHorizontal: '5%',
        marginVertical: '1%'
    },

    textInputStyle: {
        padding: 0,
        flex: 1,
        marginHorizontal: '2%',
        textAlignVertical: 'bottom',
        fontSize: 18,
    }
});

export default SignupTextInput;