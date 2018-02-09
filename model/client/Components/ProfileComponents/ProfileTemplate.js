import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewsfeedList from '../HomeComponents/NewsfeedComponents/NewsfeedList';

class ProfileTemplate extends Component {

    render(){
        if(this.props.profileData){
            const editProfileActive = false;
            const isFollowedByCurrentUser = false;

            const isCurrentUserProfile = this.props.auth.user.data._id === this.props.profileData.info._id;
            const fullName = (<span style={ { fontSize: 20, fontWeight: 'bold' } }>{ this.props.profileData.info.fullName }</span>);
            const username = (<span style={ { fontSize: 17 } }>@{ this.props.profileData.info.username }</span>);
            const bio = (<span style={ { fontSize: 15 } }>{ this.props.profileData.info.bio }</span>);
            const editFullName = (<input type='text' name='fullName' autoFocus/>);
            const editBio = (<input type='text' name='bio' placeholder='Type your bio'/>);
            const editProfilePic = (<input type='text' name='profilePic' onChange={ this.onTyping } placeholder='Paste picture url'/>);
            const followButton = (
                <div className='center-block' style={ { width: 150 } }>
                <button name={this.props.profileData.info._id} type='button'   className={ isFollowedByCurrentUser ? followButtonState.className : 'btn btn-primary btn-sm center-block' } style={ { width: 70 } }>{ isFollowedByCurrentUser ? followButtonState.text : '+ Follow' }</button>
                </div>
            );
            const saveChangeButton = (
                <div className='center-block' style={ { width: 170 } }>
                <button type='button' className='btn btn-danger btn-sm' style={ { width: 60 } } onClick={ this.onCancel }>Cancel</button>
                <button type='button' className='btn btn-primary btn-sm pull-right' style={ { width: 100 } } onClick={ this.onSaveChange }>Save Change</button>
                </div>);

            
            return (
                <div>
                { editProfileActive ? <div style={ { position: 'absolute', width: '100%', height: '100%', border: '3px solid black', backgroundColor: 'black', zIndex: 0, opacity: 0.4 } }></div> : null }
                <div className='container'>
                    <div className='row profile'>
                    <div className='col-md-3'>
                        <div className='profile-sidebar' style={ { border: '2px solid gray' } }>
                        <div className='profile-userpic'>
                            <img src={ this.props.profileData.info.profilePic } className='img-responsive center-block' style={ { width: 150 } }alt=''/>
                        </div>
                        <div className='profile-usertitle'>
                            <div className='profile-usertitle-name text-center' style={ { padding: 8, zIndex: 1 } }>
                            <div>
                                { editProfileActive ? <span style={ { fontWeight: 'bold' } }>Full Name</span> : null }
                                <div style={ editProfileActive ? { marginBottom: 15 } : null }>{ editProfileActive ? editFullName : fullName }</div>
                                { editProfileActive ? <span style={ { fontWeight: 'bold' } }>Username</span> : null }
                                <div style={ editProfileActive ? { marginBottom: 15 } : null }>{ username }</div>
                                { editProfileActive ? <span style={ { fontWeight: 'bold' } }>Bio</span> : null }
                                <div style={ editProfileActive ? { marginBottom: 15 } : null }>{ editProfileActive ? editBio : bio }</div>
                                { editProfileActive ? <span style={ { fontWeight: 'bold' } }>Profile Picture Url</span> : null }
                                <div style={ editProfileActive ? { marginBottom: 15 } : null }>{ editProfileActive ? editProfilePic : null }</div>
                            </div>
                            </div>
                        </div>
                        <div className='profile-userbuttons center-block' >
                            { editProfileActive ? saveChangeButton : isCurrentUserProfile ? null : followButton }
                        </div>
                        <div className='profile-usermenu' style={ editProfileActive ? { display: 'none' } : { border: '1px solid gray' } }>
                            <ul className='nav'>
                            <li className='active' style={ { borderTop: '1px solid gray', borderBottom: '1px solid gray' } }>
                                <a href='#'>
                                Posts: { this.props.profileData.info.posts }
                                </a>
                            </li>
                            <li style={ { borderTop: '1px solid gray', borderBottom: '1px solid gray' } }>
                                <a href='#'>
                                Following: { this.props.profileData.info.followingNum }
                                </a>
                            </li>
                            <li style={ { borderTop: '1px solid gray', borderBottom: '1px solid gray' } }>
                                <a href='#' target='_blank'>
                                Followers: { this.props.profileData.info.followersNum }
                                </a>
                            </li>
                            <li style={ { borderTop: '1px solid gray', borderBottom: '1px solid gray' } }>
                                profileSettings ?
                            </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div className='col-md-8'>
                        <div className='profile-content col-md-8' style={ editProfileActive ? { marginLeft: 100, zIndex: -1 } : { marginLeft: 100, zIndex: 0 } }>
                        <NewsfeedList />
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            );
        }else{
            return null;
        }
     
    }
   
}

function mapStateToProps(state){
    return {
        auth: state.auth,
        profileData: state.profilePage.profileData
    }
}

export default connect(mapStateToProps)(ProfileTemplate);