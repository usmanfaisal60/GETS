import { combineReducers } from 'redux';
import login from './Login';
import loader from './LoaderReducers'
import dashboard from './dashboardReducers';

export default combineReducers({
    login,
    loader,
    dashboard
});