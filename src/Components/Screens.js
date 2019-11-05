import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SignUp from './Screens/SignUp';
import Login from './Screens/Login';
import Dashboard from './Screens/Dashboard';
import RegionalAdmins from './Screens/RegionalAdmins';
import RegionalAdminApproval from './Screens/RegionalAdminApproval';

const StackNavigator = createStackNavigator({
    SignUp,
    Login,
    Dashboard,
    RegionalAdmins,
    RegionalAdminApproval
},
    {
        headerMode: 'none',
        initialRouteName: 'Login'
    });

export default createAppContainer(StackNavigator);