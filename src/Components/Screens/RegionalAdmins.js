import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TitleHeader from './Helpers/TitleHeader'



class RegionalAdmins extends React.Component {
    render() {
        const {
            container
        } = Styles;

        return (
            <View style={container}>
                <TitleHeader icon='regional_admin'>Regional Admins</TitleHeader>
                <View>
                    <Text>Count: 5</Text>
                </View>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    }
});

export default RegionalAdmins;