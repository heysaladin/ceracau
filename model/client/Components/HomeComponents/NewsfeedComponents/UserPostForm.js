import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onTyping, onSubmitPost } from '../../../redux/actions/PageActions/newsfeedPage';

class UserPostForm extends Component {
    constructor(props){
        super(props);
    }

    _handleTyping = (e) => {
        this.props.onTyping({name: e.target.name, value: e.target.value});   
    }

    _handleSubmitPost = (e) => {
        e.preventDefault();
        const { input } = this.props.newsfeedPage;
        const { user } =  this.props.auth;
        let latestPost;
        if(this.props.newsfeedPage.posts[0]){
            latestPost = this.props.newsfeedPage.posts[0].postedAt
        }else{
            latestPost = this.props.auth.user.data.joinDate;
        }     
        this.props.onSubmitPost({content: {text: input.textToPost.text, picUrl: input.picUrl}, postedBy: user.data._id, latestPost});   
        this.props.clearInterval();
    }

    render(){
        const { input, isPosting, errors } = this.props.newsfeedPage;
        return (
            <div>
                {errors ? <span className="text-danger">{errors.maxLen}{errors.contentEmpty}</span> : null}
                <form onSubmit={this._handleSubmitPost}>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            type="text"
                            placeholder="Say something..."
                            value={input.textToPost.text}
                            onChange={this._handleTyping}
                        />
                    </div>
                    <div className="form-group">
                        {input.textToPost.textLen}/140
                        <button className="btn btn-primary btn-md pull-right" disabled={isPosting}>
                            Post
                        </button> 
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        newsfeedPage: state.newsfeedPage,
        auth: state.auth,
    }
}

function mapDispatchToProps(dispatch){
    return {
        onTyping: (payload) => dispatch(onTyping(payload)),
        onSubmitPost: (payload) => dispatch(onSubmitPost(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPostForm);