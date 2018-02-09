import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './HomeComponents/Home';
import LoginPage from './LoginComponents/LoginPage';

const App = (props) => {
    const { auth } = props;
    return (
      <div>
        {auth.user.token ? <Home /> : <LoginPage />}
      </div>
    );
}

function mapStateToProps(state){
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(App);