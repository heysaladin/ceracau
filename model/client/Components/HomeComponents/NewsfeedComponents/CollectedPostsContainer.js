import React, { Component }from 'react';
import { connect } from 'react-redux';
import { revealCollectedPosts } from '../../../redux/actions/PageActions/newsfeedPage';

const CollectedPostsContainer = (props) => {
    if(props.newsfeedPage.collectedPosts){
        if(props.newsfeedPage.collectedPosts.length === 1){
            return (
                <div className="alert alert-success text-center" onClick={props.revealCollectedPosts}>
                    View { props.newsfeedPage.collectedPosts.length } more post
                </div>
            )
        }else{
            return (
                <div className="alert alert-success text-center" onClick={props.revealCollectedPosts}>
                    View { props.newsfeedPage.collectedPosts.length } more posts
                </div>
            )
        }        
    }else{
        return null;
    }
}

function mapStateToProps(state){
    return {
        newsfeedPage: state.newsfeedPage,
    }
}

function mapDispatchToProps(dispatch){
    return {
        revealCollectedPosts: () => dispatch(revealCollectedPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectedPostsContainer);