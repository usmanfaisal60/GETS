import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableNativeFeedback } from 'react-native';
import { updateMemberStatus } from '../../redux/actions';
import TitleHeader from './Helpers/TitleHeader'
import ViewPager from '@react-native-community/viewpager';
import { connect } from 'react-redux';
import ListItem from './Helpers/ListItem';
import FullScreenModal from './Helpers/FullScreenModal';


class RegionalAdmins extends React.Component {

    viewPager = React.createRef();

    state = {
        selectedTab: 0
    }

    render() {

        const {
            container,
            tabsViewContainer,
            viewPagerStyle,
            page,
            tabsContainer,
            tabContainer,
            tabText,
            textContainer
        } = Styles;

        const {
            membersData,
            loader,
            updateMemberStatus,
            user_model
        } = this.props;

        console.log(membersData);

        const pendingMembers = membersData ? membersData.filter(el => {
            return el.status === 'pending'
        }) : null;

        const approvedMembers = membersData ? membersData.filter(el => {
            return el.status === 'approved'
        }) : null;

        return (
            <View style={container}>
                <TitleHeader icon='approval'>RA - Approval</TitleHeader>
                <View style={tabsContainer}>
                    <View
                        style={{
                            ...tabContainer,
                            borderBottomWidth: this.state.selectedTab === 0 ? 1 : 0
                        }}>
                        <TouchableNativeFeedback style={{ flex: 1 }} onPress={() => this.viewPager.current.setPage(0)}>
                            <View style={textContainer}>
                                <Text style={tabText}>
                                    Requests
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View
                        style={{
                            ...tabContainer,
                            borderBottomWidth: this.state.selectedTab === 1 ? 1 : 0
                        }}>
                        <TouchableNativeFeedback style={{ flex: 1 }} onPress={() => this.viewPager.current.setPage(1)}>
                            <View style={textContainer}>
                                <Text style={tabText}>
                                    Approved
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                <View style={tabsViewContainer}>
                    <ViewPager
                        ref={this.viewPager}
                        style={viewPagerStyle}
                        onPageSelected={(e) => this.setState({ selectedTab: e.nativeEvent.position })}>
                        <View style={page}>
                            <FlatList
                                data={pendingMembers}
                                renderItem={({ item }) => <ListItem
                                    onPress={() => updateMemberStatus(user_model.user_id, item.id, 'approved', 'regional_admin')}
                                    type='RA' {...item} />
                                }
                                keyExtractor={(item) => `${item.id}`} />
                        </View>
                        <View style={page}>
                            <FlatList
                                data={approvedMembers}
                                renderItem={({ item }) => <ListItem
                                    onPress={() => updateMemberStatus(user_model.user_id, item.id, 'pending', 'regional_admin')}
                                    type='RA' {...item} />}
                                keyExtractor={(item) => `${item.id}`} />
                        </View>
                    </ViewPager>
                </View>
                {loader ? <FullScreenModal loader /> : null}
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },

    tabsViewContainer: {
        width: '100%',
        flex: 1,
    },

    viewPagerStyle: {
        width: '100%',
        flex: 1
    },

    page: {
        width: '100%',
        height: '100%',
    },

    tabsContainer: {
        width: '100%',
        height: 50,
        flexDirection: 'row'
    },

    tabText: {
        fontSize: 20
    },

    tabContainer: {
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = state => {
    return {
        ...state.login,
        ...state.dashboard,
        ...state.loader
    }
}

export default connect(mapStateToProps, { updateMemberStatus })(RegionalAdmins);