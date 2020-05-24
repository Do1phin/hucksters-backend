import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

const loggerMiddleware = createLogger();
const initialState = {};

const middleware = [thunkMiddleware, loggerMiddleware];

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;