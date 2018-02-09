import React, { Component } from 'react';
import Navbar from '../NavBar';
import { connect } from 'react-redux';

import NewsfeedPage from './NewsfeedComponents/NewsfeedPage';

const Home = (props) => {
    const { pathname } = props.router.location;
    return(
        <div>
            <Navbar />
            {pathname === '/' ? <NewsfeedPage /> : null}
         </div>
    )
}

function mapStateToProps(state){
    return{
        router: state.router
    }
}

export default connect(mapStateToProps)(Home);