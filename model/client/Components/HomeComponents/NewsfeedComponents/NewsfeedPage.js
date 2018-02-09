import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInitialPosts, getRecentPosts } from '../../../redux/actions/PageActions/newsfeedPage';

import NewsfeedList from './NewsfeedList';
import UserPostForm from './UserPostForm';
import CollectedPostsContainer from './CollectedPostsContainer';

class NewsfeedPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            intervalId: ''
        };
        this.getRecentPosts = this.getRecentPosts.bind(this);
        this.clearInterval = this.clearInterval.bind(this);
    }

    componentDidMount(){
        if(this.props.auth.loggedIn){
             this.props.getInitialPosts(); 
        }        
        
        const intervalId = setInterval(this.getRecentPosts, 5000);
        this.setState({intervalId})   
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    clearInterval(){
         clearInterval(this.state.intervalId);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.newsfeedPage.isPosting === true && nextProps.newsfeedPage.isPosting === false){
             const intervalId = setInterval(this.getRecentPosts, 5000);
             this.setState({intervalId}) 
        }
    }

    getRecentPosts(){
        let latestPost;
        if(this.props.newsfeedPage.posts[0]){
            latestPost = this.props.newsfeedPage.posts[0].postedAt
        }else{
            latestPost = this.props.auth.user.data.joinDate;
        }         
        this.props.getRecentPosts(latestPost);
    }


    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-5 col-md-offset-4">
                        <UserPostForm getRecentPosts={this.getRecentPosts} clearInterval={this.clearInterval}/>
                        <CollectedPostsContainer />
                        <NewsfeedList />
                    </div>
                </div>
            </div>
        )
    }
    
}

function mapStateToProps(state){
    return {
        auth: state.auth,
        newsfeedPage: state.newsfeedPage,
    }
}

function mapDispatchToProps(dispatch){
    return{
        getInitialPosts: () => dispatch(getInitialPosts()),
        getRecentPosts: (data) => dispatch(getRecentPosts(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsfeedPage);