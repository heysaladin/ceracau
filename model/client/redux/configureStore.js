import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic, rootReducer } from './root'; 
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';


export const history = createHistory();
const routingMiddleware = routerMiddleware(history)

// Define epicMiddleware
const epicMiddleware = createEpicMiddleware(rootEpic);

// Define configureStore
export function configureStore(){
    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(routingMiddleware, epicMiddleware)),
    );

    return store;
}