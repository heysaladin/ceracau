import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onFollowPressed } from '../../redux/actions/follow';

class SearchResultsList extends Component {
    _handleFollow = () => {
        const { searchResult } = this.props.searchPage;
       this.props.onFollowPressed({ requestedId: searchResult._id, isFollowing: searchResult.isFollowedByCurrentUser });
    }

    render(){
        if(this.props.searchPage.searchResult){
            const { searchResult } = this.props.searchPage;
            return (
                <div className="col-md-4 col-md-offset-4">
                    <div className='media'>
                    <div className='media-left'>
                        <img src={ searchResult.profilePic } style={ { width: 100 } }/>
                    </div>
                    <div className='media-body'>
                        <h4 className='media-heading'><a href='#' name={ searchResult.username }>{searchResult.username} </a>&nbsp;&nbsp;&nbsp;&nbsp;<button  className='btn btn-primary btn-sm' onClick={this._handleFollow}>{ searchResult.isFollowedByCurrentUser ? 'Following' : '+Follow' }</button></h4>
                        <h5 style={ { fontWeight: 'bold' } }>{ searchResult.fullName }&nbsp;&nbsp;&nbsp;&nbsp;<span style={ { fontWeight: 'normal' } }>{ searchResult.isFollowingCurrentUser ? 'FOLLOWS YOU' : null }</span></h5>
                        <p>{ searchResult.bio }</p>
                    </div>
                    </div>
                </div>
            )
        }else if(this.props.searchPage.searchResult === false){
            return (
                <div className="col-md-4 col-md-offset-4 text-center">
                    <h1>No result</h1>
                </div>
            ); 
        }else{
            return null;
        }    
    }
    
}

function mapStateToProps(state){
    return {
        searchPage: state.searchPage
    }
}

function mapDispatchToProps(dispatch){
    return {
        onFollowPressed: (data) => dispatch(onFollowPressed(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsList);