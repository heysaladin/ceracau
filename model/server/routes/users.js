import express from 'express';
import passport from 'passport';
import { updateFollowStatus } from '../models/user';

const router = express.Router();

router.post('/follow', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const userRequesting = req.user._id.toString();
    const userRequested = req.body.requestedId;
    const { isFollowing } = req.body;

    const users = { userRequesting, userRequested } 

    updateFollowStatus(users, isFollowing, (err, user) => {
        if(err){
            res.status(500).json({msg: "error"})
        }else{
            user[0].isFollowedByCurrentUser = !isFollowing;
            user[0].isFollowingCurrentUser = user[0].following.includes(userRequesting);
            res.status(200).json({user: user[0]});
        }
    });


});

export default router;