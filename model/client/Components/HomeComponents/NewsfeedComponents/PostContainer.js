import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { convertDate } from '../../../tools/dateConverter';
import { connect } from 'react-redux';
import Comments from './Comments/Comments';

const PostContainer = (props) => {
    const {content, postedBy, postedAt, _id, commentsCount, likesCount, isLikedByCurrentUser} = props.post;
    const commentIcon = require('../../../../public/assets/icons/comment.png');
    const loveOnIcon =  require('../../../../public/assets/icons/love-on.png');
    const loveOffIcon =  require('../../../../public/assets/icons/love-off.png');
    
    const commentField = ( 
        <form onSubmit={props.onSubmitComment}>
             <div>
                <Comments />
             </div>
             <div className="row">
                <div className="form-group col-sm-10">
                    <input 
                        className="form-control" 
                        type="text" 
                        value={props.eachPost.commentInput}
                        onChange={props.onTypingComment}
                    />
                </div>
                <div className="form-group">
                    <button>Go</button>
                </div>
            </div>
        </form> )

    return (
        <div>
            <div className="media well" style={{marginBottom: 0}}>
                <div className="media-left">
                    <Link to="/" style={ { textDecoration: 'none' } }><img src={postedBy.profilePic} className="media-object img-rounded" style={ { width: 50 } }/></Link>
                </div>
                <div className="media-body">
                    <h4 className="media-heading"><Link to= "/" style={ { fontSize: 15, fontWeight: 'bold' } }>{postedBy.username}</Link>&nbsp;<span style={ { fontSize: 13, color: 'gray' } }>{postedBy.fullName}</span>&nbsp;&bull;&nbsp;
                    <span style={ { fontSize: 12, color: 'gray' } }>{convertDate(postedAt)}</span>
                    </h4>
                    <p style={ { wordBreak: 'break-all' } }>{content.text}</p>
                    
                    <div className="pull-left">
                    <span ><img src={commentIcon} onClick={props.onCommentFocused} id={isLikedByCurrentUser ? `true_${_id}` : _id} style={{ width: 14 }}/></span>&nbsp;<span>{ commentsCount }</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img src={isLikedByCurrentUser ? loveOnIcon : loveOffIcon} id={isLikedByCurrentUser ? `true_${_id}` : _id} onClick={props.onLikePressed} style={{ width: 11 }} /><span style={ { fontSize: 12 } }>{likesCount}</span>
                    </div>
                    <br/>
                    <br/>
                </div>
                 { props.eachPost.commentFocused === _id ? commentField : null }
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return {
        eachPost: state.eachPost,
    }
}

export default connect(mapStateToProps)(PostContainer);