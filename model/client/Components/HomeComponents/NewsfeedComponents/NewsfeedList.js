import React, { Component } from 'react';
import PostContainer from './PostContainer';
import { connect } from 'react-redux';
import { onCommentFocused, onTypingComment, onSubmitComment, onLikePressed } from '../../../redux/actions/eachPost';

class NewsfeedList extends Component{
    _handleCommentFocused = (e) => {
        this.props.onCommentFocused(e.target.id);     
    }

    _handleLikePressed = (e) => {
         this.props.onLikePressed({postId: e.target.id}); 
    }

    _handleTypingComment = (e) => {
        this.props.onTypingComment(e.target.value);
    }

    _handleSubmitComment = (e) => {
        e.preventDefault();
        this.props.onSubmitComment({postId: this.props.eachPost.commentFocused, text: this.props.eachPost.commentInput, liked: this.props.eachPost.isLiked});
    }

    render(){
        if(this.props.router.location.pathname ==='/' ){
            if(this.props.newsfeedPage.posts){
                const posts = this.props.newsfeedPage.posts.map(post =>
                    <PostContainer 
                        key={post._id} 
                        post={post} 
                        onCommentFocused={this._handleCommentFocused} 
                        onLikePressed={this._handleLikePressed}
                        onTypingComment={this._handleTypingComment}
                        onSubmitComment={this._handleSubmitComment}
                    />
                )
                return (        
                    <div>
                        {posts}
                    </div>
                )
            }else{
                return null;
            }
        }else{
             if(this.props.profileData.posts){
                const posts = this.props.profileData.posts.map(post =>
                    <PostContainer 
                        key={post._id} 
                        post={post} 
                        onCommentFocused={this._handleCommentFocused} 
                        onLikePressed={this._handleLikePressed}
                        onTypingComment={this._handleTypingComment}
                        onSubmitComment={this._handleSubmitComment}
                    />
                )
                return (        
                    <div>
                        {posts}
                    </div>
                )
            }else{
                return null;
            }
        }
        
    }
    
    
}

function mapStateToProps(state){
    return {
        newsfeedPage: state.newsfeedPage,
        profileData: state.profilePage.profileData,
        eachPost: state.eachPost,
        router: state.router,
    }
}

function mapDispatchToProps(dispatch){
    return {
        onCommentFocused: (data) =>dispatch(onCommentFocused(data)),
        onTypingComment: (data) => dispatch(onTypingComment(data)),
        onSubmitComment: (data) => dispatch(onSubmitComment(data)),
        onLikePressed: (data) => dispatch(onLikePressed(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsfeedList);