import React from 'react';
import { View, Image, StyleSheet, Dimensions, Picker, Keyboard } from 'react-native';

const SignupPicker = props => {

    const {
        container,
        imageStyle,
        pickerStyle
    } = Styles;

    const {
        icon,
        value,
        data,
        onValueChange,
        last
    } = props;

    const mainPadding = Dimensions.get('window').width * 0.05;

    return (
        <View style={{ ...container, marginBottom: last ? mainPadding * 2 : mainPadding }} >
            <Image
                source={icons[icon]}
                style={imageStyle}
                resizeMode='contain' />
            <Picker
                style={pickerStyle}
                onValueChange={(value) => { if (onValueChange) console.log(value); onValueChange(value); Keyboard.dismiss(); }}
                selectedValue={value}>
                <Picker.Item label={'Please select ' + icon} value='select' />
                {data ? data.map((el, i) => <Picker.Item key={i} value={el[1]} label={el[0]} />) : null}
            </Picker>
        </View>
    )
};

const icons = {
    city: require('../../../Assets/signupicons/city.png'),
    fullname: require('../../../Assets/signupicons/fullname.png'),
    iqama: require('../../../Assets/signupicons/iqama.png'),
    phnum: require('../../../Assets/signupicons/phnum.png'),
    region: require('../../../Assets/signupicons/region.png'),
    role: require('../../../Assets/signupicons/role.png')
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

    pickerStyle: {
        padding: 0,
        flex: 1,
        marginRight: '3%',
        textAlignVertical: 'bottom',
        fontSize: 18,
    }
});

export default SignupPicker;