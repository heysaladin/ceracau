import express from 'express';
import { getUserByUsername } from '../models/user';  
import passport from 'passport';

const router = express.Router();

router.get('/str/:search', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const searchQuery = req.params.search;
    const userId = req.user._id.toString();

    getUserByUsername(searchQuery, (err, user) => {
        if(err){
            res.status(500).json({msg: "error"})
        }else{
            if(user){
                user.isFollowedByCurrentUser = user.followers.includes(userId);
                user.isFollowingCurrentUser = user.following.includes(userId);
                res.status(200).json({searchResult: user}) 
            }else{
                res.json({searchResult: false, msg: "no result"})
            }
            
        }
    });
});

export default router;