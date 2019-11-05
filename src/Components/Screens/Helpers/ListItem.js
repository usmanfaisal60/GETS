import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback } from 'react-native';

const ListItem = props => {

    const {
        container,
        descriptionContainer,
        actionButtonsContainer,
        idContainer,
        descriptionText,
        imageStyle,
        buttonContainer
    } = Styles;

    const {
        id,
        fullname,
        type,
        iqama_number,
        phone_number,
        region,
        city,
        status,
        onPress
    } = props;

    return (
        <View style={container}>
            <View style={idContainer}>
                <Text style={{ fontSize: 17 }}>{type} - {id}</Text>
            </View>
            <View style={descriptionContainer}>
                <Text style={descriptionText}>Name: {fullname}</Text>
                <Text style={descriptionText}>Iqama: {iqama_number}</Text>
                <Text style={descriptionText}>Phone: {phone_number}</Text>
                <Text style={descriptionText}>City: {city}</Text>
                <Text style={descriptionText}>Region: {region}</Text>
            </View>
            <View style={actionButtonsContainer}>
                <TouchableOpacity >
                    <Image style={imageStyle} source={require('../../../Assets/signupicons/phnum.png')} />
                </TouchableOpacity>

                <TouchableNativeFeedback onPress={() => { if (onPress) onPress() }}>
                    <View style={{ ...buttonContainer, backgroundColor: status === 'pending' ? 'green' : 'red' }}>
                        <Text style={{ color: '#fff' }}>{status === 'pending' ? 'approve' : 'unapprove'}</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    )
};

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 125,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: '#ddd'
    },

    descriptionContainer: {
        flex: 6,
        height: '100%',
        justifyContent: 'center',
        marginLeft: 5
    },

    actionButtonsContainer: {
        flex: 3,
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    idContainer: {
        flex: 2,
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: '#ccc',
    },

    descriptionText: {
        padding: 1
    },

    imageStyle: {
        width: 20,
        height: 20
    },

    buttonContainer: {
        padding: 5,
        justifyContent: 'center',
        borderColor: '#fff',
        borderRadius: 3,
        elevation: 5
    }
});

export default ListItem;