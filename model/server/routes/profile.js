import express from 'express';
import { getProfileDataByUsername } from '../models/profile';

const router = express.Router();

router.get(`/:username`, (req, res, next) => {
    const username = req.params.username;

    getProfileDataByUsername(username, (err, profile) => {
        if(err){
            res.status(500).json({msg: "error"})
        }else{
            const profileData = profile[0].tempProfile[0]
             res.status(200).json({profileData})
        }
    });
});

export default router;