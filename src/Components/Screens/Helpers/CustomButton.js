import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableNativeFeedback } from 'react-native';

const CustomButton = props => {

    const {
        container,
        touchContainer
    } = Styles;

    const {
        children,
        onPress,
        blue
    } = props;

    return (
        <View style={{ width: '100%', alignItems: 'center', backgroundColor: 'transparent' }}>
            <View style={{...container, backgroundColor: blue ? '#03a9f4' : '#c7b301'}}>
                <TouchableNativeFeedback
                    onPress={() => { if (onPress) onPress() }}
                    style={{ flex: 1, height: '100%' }}>
                    <View style={touchContainer}>
                        <Text style={{ fontSize: 20, color: '#fff', fontFamily: 'sans-serif-light' }}>
                            {children}
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    )
};

const height = Dimensions.get('window').height * 0.075;

const Styles = StyleSheet.create({
    container: {
        width: '75%',
        height,
        borderRadius: height / 2,
        overflow: 'hidden',
        elevation: 5
    },

    touchContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default CustomButton;