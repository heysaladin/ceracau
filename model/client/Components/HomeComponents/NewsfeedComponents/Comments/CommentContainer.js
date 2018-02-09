import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { convertDate } from '../../../../tools/dateConverter';

const CommentContainer = (props) => {
    return (
        <div style={{ padding: 5, backgroundColor: '#F2F6F9', border: '1px solid #CAE9FF', fontSize: 12 } }>
            <span style={ { fontWeight: 'bold' } }><Link to="/">{ props.comment.postedBy }</Link></span>&nbsp;&nbsp;{ props.comment.content.text }
            <span className='pull-right' style={ { fontSize: 12, color: 'gray' } }>{convertDate(props.comment.postedAt)}</span>
        </div>
    )
}

export default CommentContainer;