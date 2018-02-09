import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux'
import { configureStore, history } from './redux/configureStore';
import App from './Components/App';
import SignupPage from './Components/SignupComponents/SignupPage';
import 'rxjs';
import { Route } from 'react-router';
import { setAuthorizationToken } from './utils/setAuthorizationToken';
import { setCurrentUser } from './redux/actions/auth';
import SearchPage from './Components/SearchComponents/SearchPage';
import ProfilePage from './Components/ProfileComponents/ProfilePage';

const store = configureStore()

if(localStorage.jwtToken){
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser({token: localStorage.jwtToken, data: JSON.parse(localStorage.getItem('user'))}));
}

render(
<Provider store={ store }>
<Router history={ history }>
    <div>      
        <Route exact path="/" component={App} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/search/str/:searchQuery" component={SearchPage} />
        <Route exact path="/profile/:username" component={ProfilePage} />
    </div>
</Router>
</Provider>, document.getElementById('app'));