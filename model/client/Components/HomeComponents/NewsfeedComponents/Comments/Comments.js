import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentContainer from './CommentContainer';

const Comments = (props) => {
    if(props.eachPost.comments){
        const comments = props.eachPost.comments.map(comment => 
            <CommentContainer key={comment.id} comment={comment}/>
        )
        return (
            <div style={{maxHeight: 200, overflowY: 'auto'}}>
                {comments}
            </div>
        )
    }else{
        return null;
    }
    
}

function mapStateToProps(state){
    return {
        eachPost: state.eachPost,
    }
}

export default connect(mapStateToProps)(Comments);