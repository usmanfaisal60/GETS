import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Template = props => {

    const {
        container
    } = Styles;

    const {
        loader
    } = props

    return (
        <View style={container}>
            {loader ? 
            <ActivityIndicator size='large' />
            :
            null
            }
        </View>
    )
};

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: '#000a',
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5
    }
});

export default Template;