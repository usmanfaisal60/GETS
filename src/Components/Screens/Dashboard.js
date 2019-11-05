import React from 'react';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { checkStatus } from '../../redux/actions';
import FullScreenModal from './Helpers/FullScreenModal';
import AdminButtons from './Helpers/AdminButtons';
import Aux from '../HOC/AUX/Aux';


class Dashboard extends React.Component {

    componentDidMount() {
        const {
            checkStatus,
            user_model
        } = this.props;
        checkStatus(user_model.user_id, 'regional_admin');
    }

    renderMenu(role_type) {
        if (role_type === 'admin') {
            return <AdminButtons navigation={this.props.navigation}/>
        }
    }

    render() {
        const {
            container,
            imageStyle,
            imageContainer,
            descriptionStyle,
            menuButtonsContainer
        } = Styles;

        const {
            loader,
            user_model
        } = this.props;

        return (
            <View style={container}>
                <StatusBar backgroundColor='#fff' barStyle='dark-content' />
                {!loader && user_model ?
                    <Aux>
                        <View style={imageContainer}>
                            <Image resizeMode='contain' source={require('../../Assets/logo.png')} style={imageStyle} />
                            <Text style={descriptionStyle}>Welcome to GETS, {user_model.user_name}</Text>
                        </View>
                        <View style={menuButtonsContainer}>
                            {this.renderMenu.bind(this, user_model.role_type)()}
                        </View>
                    </Aux>
                    :
                    null}
                {loader ? <FullScreenModal loader /> : null}
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },

    imageContainer: {
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderBottomWidth: 1
    },

    imageStyle: {
        width: '40%',
        marginVertical: '5%'
    },

    descriptionStyle: {
        padding: 10,
        fontSize: 20,
        fontFamily: 'serif',
        marginBottom: '4%'
    },

    menuButtonsContainer: {
        flex: 1,
        width: '100%',
    }
});

const mapStateToProps = state => {
    return {
        ...state.login,
        ...state.loader
    }
}

export default connect(mapStateToProps, { checkStatus })(Dashboard);