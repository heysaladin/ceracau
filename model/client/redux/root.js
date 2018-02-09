import { combineReducers, compose } from 'redux';
import { combineEpics } from 'redux-observable';
import auth from './reducers/auth';
import { routerReducer } from 'react-router-redux';
import { loginEpic } from './observables/epics/loginEpic';
import { signupEpic } from './observables/epics/signupEpic';
import { searchEpic, followEpic } from './observables/epics/searchEpic';
import { postingContentEpic, 
         initialPostsEpic, 
         recentPostsEpic, 
         commentEpic } from './observables/epics/newsfeedEpic';
import { fetchCommentsEpic, likeEpic } from './observables/epics/eachPostEpic';

import { profileEpic } from './observables/epics/profileEpic';

import loginPage from './reducers/PageReducers/loginPage';
import signupPage from './reducers/PageReducers/signupPage';
import newsfeedPage from './reducers/PageReducers/newsfeedPage';
import searchPage from './reducers/PageReducers/searchPage';
import navbar from './reducers/navbar';
import eachPost from './reducers/eachPost';
import profilePage from './reducers/PageReducers/profilePage';

export const rootEpic = combineEpics(
    loginEpic,
    signupEpic,
    postingContentEpic,
    initialPostsEpic,
    recentPostsEpic,
    searchEpic,
    followEpic,
    commentEpic,
    fetchCommentsEpic,
    likeEpic,
    profileEpic,
);

const appReducer = combineReducers({
    router: routerReducer,
    loginPage,
    signupPage,
    newsfeedPage,
    searchPage,
    auth,
    navbar,
    eachPost,
    profilePage,
});

export const rootReducer = (state, action) => {
    if(action.type == 'RESET_REDUX_STATE'){
        state=undefined;
    }

    return appReducer(state, action)
}