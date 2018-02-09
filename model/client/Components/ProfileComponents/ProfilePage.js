import React, { Component } from 'react';
import { fetchProfile } from '../../redux/actions/PageActions/profilePage';
import { connect } from 'react-redux';
import NavBar from '../NavBar';
import ProfileTemplate from './ProfileTemplate';

class ProfilePage extends Component {
    componentDidMount(){
        const username = this.props.location.pathname.substring(9);
        this.props.fetchProfile(username);
    }

    render(){
        return (
            <div>
                <NavBar />
                <ProfileTemplate />
            </div>
        )
    }    
}

function mapDispatchToProps(dispatch){
    return {
        fetchProfile: (data) => dispatch(fetchProfile(data))
    }
}

export default connect(null, mapDispatchToProps)(ProfilePage);