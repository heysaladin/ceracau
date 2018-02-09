
import { User } from './user'
import { Post } from './post'

export function getProfileDataByUsername(username, callback){
    let profileData = {info: null, posts: null}
    User.findOne({username: username}, {following: 0, followers: 0, tempPosts: 0})
    .exec()
    .then(res => Post.find({'postedBy.id': res._id}, {tempComments: 0, comments: 0}).exec().then(res => profileData.posts = res))
    .then(res => User.findOne({username: username}, {tempPosts: 0, tempProfile: 0}).exec().then(res => profileData.info = res))
    .then(res => profileData.posts.map(post => {
        post.postedBy.username = profileData.info.username;
        post.postedBy.fullName = profileData.info.fullName;
        post.postedBy.profilePic = profileData.info.profilePic;
    }))
    .then(res => User.update({username: username}, {$set: {tempProfile: profileData}}))
    .then(res => User.find({username: username}, {tempProfile: 1}, callback))
}