import React from 'react';
import {Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Screens from './Components/Screens';
import reducers from './redux/reducers';

const App = () => {
    return (
        <Provider store={createStore(reducers, applyMiddleware(thunk))}>
            <Screens />
        </Provider>
    )
}

export default App;