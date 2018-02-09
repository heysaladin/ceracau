import mongoose from 'mongoose';
import { User } from './user';

const PostSchema = mongoose.Schema({
    content: {
        text: {
            type: String,
        },
        picUrl: {
            type: String,
        },
    },
    postedBy: {
        id: {
            type: String,
            required: true
        },
        username: {
            type: String,
        },
        fullName: {
            type: String
        },
        profilePic: {
            type: String
        }
    },
    postedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    comments: {
        type: Array,
    },
    commentsCount: {
        type: Number,
        required: true,
        default: 0,
    },
    likedBy: {
        type: Array,
    },
    likesCount: {
        type: Number,
        required: true,
        default: 0,
    },
    isLikedByCurrentUser: {
        type: Boolean,
        required: true,
        default: false,
    },
    tempComments: {
        type:Array
    }
});

export const Post = mongoose.model('Post', PostSchema);

export function addPost(newPost, callback){
    User.update({_id: newPost.postedBy}, {$inc: {postCount: 1}}, () => newPost.save(callback));
}

export function fetchPostsByUserId(id, callback){
    const users = [];
    let posts = [];
    let translatedPosts = [];
    let done = false;
    User.findOne({_id: id} , {following: 1, _id: 0})
    .exec()
    .then(res => Post.find({'postedBy.id': {$in: [id, ...res.following]}}, {comments: 0}).sort({postedAt: -1}).limit(50))
    .then(res => res.map(eachResult => {
        users.push(eachResult.postedBy.id)
        posts.push(eachResult);
    }))
    .then(res => User.find({_id: {$in: users}}, {username: 1, fullName: 1, profilePic: 1}))
    .then(res => posts.map(post => {
        const liked = post.likedBy.indexOf(id.toString()) > -1
        post.isLikedByCurrentUser = liked;
        for(let i=0; i<res.length; i++){
            if(post.postedBy.id == res[i]._id){
                post.postedBy.username = res[i].username;
                post.postedBy.fullName = res[i].fullName;
                post.postedBy.profilePic = res[i].profilePic;
                translatedPosts.push(post);
                break;
            }
        }
    }))
    .then(res => User.update({_id: id}, { $set: { tempPosts: translatedPosts} }))
    .then(res => User.findOne({_id: id}, {tempPosts: 1, _id: 0}, callback))
    .catch(err => console.log(err));
}

export function fetchRecentPostsByUserId(id, latestPost, callback){
    const users = [];
    let posts = [];
    let translatedPosts = [];
    let done = false;
    User.findOne(id, {following: 1, _id: 0})
     .exec()
    .then(res => Post.find({'postedBy.id': {$in: [id, ...res.following]}, postedAt: {$gt: latestPost}}, {comments: 0}).sort({postedAt: -1}))
    .then(res => res.map(eachResult => {
        users.push(eachResult.postedBy.id)
        posts.push(eachResult);
    }))
    .then(res => User.find({_id: {$in: users}}, {username: 1, fullName: 1, profilePic: 1}))
    .then(res => posts.map(post => {
        const liked = post.likedBy.indexOf(id.toString()) > -1
        post.isLikedByCurrentUser = liked;
        for(let i=0; i<res.length; i++){
            if(post.postedBy.id == res[i]._id){
                post.postedBy.username = res[i].username;
                post.postedBy.fullName = res[i].fullName;
                post.postedBy.profilePic = res[i].profilePic;
                translatedPosts.push(post);
                break;
            }
        }
    }))
    .then(res => User.update({_id: id}, { $set: { tempPosts: translatedPosts} }))
    .then(res => User.findOne({_id: id}, {tempPosts: 1, _id: 0}, callback))
    .catch(err => console.log(err));
}


export function addNewComment(commentData, userCommenting, callback){
    const commentId = Math.random().toString(36).slice(2)+Date.now().toString();
    let post;
    let commenters=[]

    Post.update({_id: commentData.postId}, {$push: {comments: {id: commentId, postedBy: userCommenting, postedAt: new Date().toISOString(), content: {text: commentData.text}}}, $inc:{commentsCount: 1}})
    .exec()
    .then(res => Post.findOne({_id: commentData.postId}, {content: 1, postedBy: 1, postedAt: 1, comments: 1, commentsCount: 1, likesCount: 1})
        .exec()
        .then(res => post = res)
    )
    .then(res => User.findOne({_id: res.postedBy.id}).exec().then(res => {post.postedBy.username = res.username, post.postedBy.fullName = res.fullName, post.postedBy.profilePic = res.profilePic, post.isLikedByCurrentUser = commentData.liked}))
    .then(res => post.comments.map(comment => {
        commenters.push(comment.postedBy)
    }))
    .then(res => User.find({_id: {$in: commenters}}))
    .then(res => post.comments.map(comment => {
        for(let i=0; i<res.length; i++){
            if(comment.postedBy === res[i]._id.toString() ){
                comment.postedBy = res[i].username;
                break;
            }
        }            
    }))
    .then(res => User.update({_id: userCommenting}, {$set: {tempPosts: post}}))
    .then(res => User.findOne({_id: userCommenting}, {tempPosts: 1}, callback))
}


export function getCommentsByPostId(postId, callback){
    const comments = [];
    const commenters = [];

    Post.findOne({_id: postId}, {comments: 1})
    .then(res => res.comments.map(comment => {
        comments.push(comment);
        commenters.push(comment.postedBy);
    }))
    .then(res => User.find({_id: {$in: commenters}}, {username: 1, fullName: 1, profilePic: 1}))
    .then(res => comments.map(comment => {
        for(let i=0; i<res.length; i++){
            if(comment.postedBy === res[i]._id.toString() ){
                comment.postedBy = res[i].username;
                break;
            }
        }          
    }))
    .then(res => Post.update({_id: postId}, {$set: {tempComments: comments}}))
    .then(res => Post.find({_id: postId}, {tempComments: 1}, callback))
}

export function updateLikeStatus(postId, userId, liked, callback){
    let updatedPost;
    if(liked){
        Post.update({_id: postId}, {$pull: {likedBy: userId}, $inc: {likesCount: -1}})
        .exec()
        .then(res => Post.findOne({_id: postId}, {comments: 0, likedBy: 0, tempComments: 0}).exec().then(res => updatedPost = res))
        .then(res => User.findOne({_id: res.postedBy.id}, {following: 0, followers: 0}).exec().then(res => {updatedPost.postedBy.username = res.username, updatedPost.postedBy.fullName = res.fullName, updatedPost.postedBy.profilePic = res.profilePic, updatedPost.isLikedByCurrentUser = !liked}))
        .then(res => User.update({_id: userId}, {$set: {tempPosts: updatedPost}}))
        .then(res => User.find({_id: userId}, {tempPosts: 1}, callback))
    }else{
        Post.update({_id: postId}, {$addToSet: {likedBy: userId}, $inc: {likesCount: 1}})
        .exec()
        .then(res => Post.findOne({_id: postId}, {comments: 0, likedBy: 0, tempComments: 0}).exec().then(res => updatedPost = res))
        .then(res => User.findOne({_id: res.postedBy.id}, {following: 0, followers: 0}).exec().then(res => {updatedPost.postedBy.username = res.username, updatedPost.postedBy.fullName = res.fullName, updatedPost.postedBy.profilePic = res.profilePic, updatedPost.isLikedByCurrentUser = !liked}))
        .then(res => User.update({_id: userId}, {$set: {tempPosts: updatedPost}}))
        .then(res => User.find({_id: userId}, {tempPosts: 1}, callback))
    }
        
}