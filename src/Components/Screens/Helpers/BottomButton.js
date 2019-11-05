import React from 'react';
import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';

const BottomButton = props => {

    const {
        container,
        touchContainer,
        textStyle,
        labelStyle
    } = Styles;

    const {
        onPress,
        children,
        label
    } = props;

    return (
        <View style={container}>
            <Text style={labelStyle}>{label}</Text>
            <TouchableNativeFeedback onPress={() => { if (onPress) onPress() }}>
                <View style={touchContainer}>
                    <Text style={textStyle}>{children}</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
};

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '12%',
        position: 'absolute',
        alignItems: 'center',
        bottom: 0
    },

    touchContainer: {
        backgroundColor: '#03a9f4',
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textStyle: {
        color: '#fff',
        fontSize: 20
    },

    labelStyle: {
        color: '#aaa'
    }
});

export default BottomButton;