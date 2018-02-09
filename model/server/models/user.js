import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import config from '../config/database';

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    joinDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    profilePic: {
        type: String,
        required: true,
        default: 'http://bonniesomerville.nz/wp-content/uploads/2015/08/profile-icon.png'
    },
    bio: {
        type: String,
    },
    postCount: {
        type: Number,
        required: true,
        default: 0,
    },
    followers: {
        type: Array,
    },
    following: {
        type: Array,
    },
    followersCount: {
        type: Number,
        required: true,
        default: 0,
    },
    followingCount: {
        type: Number,
        required: true,
        default: 0,
    },
    notifications: {
        type: Array,
    },
    unreadNotifCount: {
        type: Number,
        default: 0
    },
    tempPosts: {
        type: Array,
    },
    tempProfile: {
        type: Array,
    },
    isFollowedByCurrentUser: {
        type: Boolean,
        required: true,
        default: false,
    },
    isFollowingCurrentUser: {
        type: Boolean,
        required: true,
        default: false,
    }
});

export const User = mongoose.model('User', UserSchema);

export function addUser(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

export function getUserById(id, callback){
    User.findById(id, {following: 0, followers: 0, notifications: 0}, callback);
}

export function getUserByUsername(username, callback){
	const query = {username: username};
	User.findOne(query, {notifications: 0}, callback);
}


export function getUserByUsernameOrEmail(identifier, callback){
	const query = [{username: identifier}, {email: identifier}];
	User.findOne({
		 $or: query
	   }, {following: 0, followers: 0, notifications: 0}, callback);
}

export function updateFollowStatus(users, isFollowing, callback){
    if(isFollowing){
        User.update({_id: users.userRequested}, {$pull: {followers: users.userRequesting}, $inc: {followersCount: -1}})
        .exec()
        .then(res => User.update({_id: users.userRequesting}, {$pull: {following: users.userRequested}, $inc: {followingCount: -1}}))
        .then(res => User.find({_id: users.userRequested}, {notifications: 0}, callback))
        .catch(err => console.log(err));
    }else{
        User.update({_id: users.userRequested}, {$addToSet: {followers: users.userRequesting}, $inc: {followersCount: 1}})
        .exec()
        .then(res => User.update({_id: users.userRequesting}, {$addToSet: {following: users.userRequested}, $inc: {followingCount: -1}}))
        .then(res => User.find({_id: users.userRequested}, {notifications: 0}, callback))
        .catch(err => console.log(err));
    }
}