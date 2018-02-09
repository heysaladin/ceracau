import express from 'express';
import { User, addUser } from '../models/user';

const router = express.Router();


// Register user with express validation
router.post('/', (req, res, next) => {
    req.assert('fullName', 'This field is required')
    .notEmpty();

    req.assert('username', 'Only \'.\' and \'_\' symbols are allowed')
    .notEmpty().withMessage('This field is required').matches(/^[a-zA-Z0-9.\-_$@*!]{1,}$/, "i");

    req.assert('password', 'Passwords must match')
    .notEmpty().withMessage('This field is required').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
    .withMessage('Password must be at least 8 characters containing A-Z, a-z, and number').equals(req.body.passwordConfirmation);
 
    req.assert('email', 'Invalid email')
    .notEmpty().withMessage('This field is required')
    .isEmail();

    req.getValidationResult().then((result) => {
        if(result.array()[0]){
             res.status(403).json({user: null, success: false, errors: result.array()});
        }else{
            const {fullName, username, email, password} = req.body;
            const newUser = User({
                fullName: fullName,
                username: username,
                email: email,
                password: password,
            });

            addUser(newUser, (err, user) => {
                if(err){
                     err;
                    res.status(403).json({user: user, success: false, errors: err});
                }else{
                    res.status(200).json({user: user, success: true, errors: null});
                }
            })
            
        }
                   
    });
});

export default router;