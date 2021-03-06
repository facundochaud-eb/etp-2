import {
    createStore,
    applyMiddleware,
    combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';
import {reducer as formReducer} from 'redux-form';
import {routerMiddleware, routerReducer} from 'react-router-redux';
import {browserHistory} from 'react-router';
import actionLogger from '../utils/middleware';

import formTemplateReducer from './formTemplate';

const loadDefaultReducers = () => combineReducers({
    form: formReducer,
    routing: routerReducer,
    formTemplate: formTemplateReducer,
});

const configureStore = ({
    reducer = loadDefaultReducers(),
    initialState = {},
    middleware = [
        thunk,
        createLogger({collapsed: true}),
        routerMiddleware(browserHistory),
        actionLogger
    ],
}) => (
    createStore(
        reducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(
                ...middleware,
            )
        )
    )
);

export default configureStore;
