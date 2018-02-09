import express from 'express';
import { User, getUserByUsernameOrEmail } from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/database';
const router = express.Router();

router.post('/', (req, res, next) => {
    const { identifier, password } = req.body;
    
   getUserByUsernameOrEmail(identifier, (err, user) => {
		if(err) throw err;
		if(user){
			if(bcrypt.compareSync(password, user.password)){
				const token = jwt.sign({
					id: user._id,
					user: user,
                }, config.jwtSecret);
                res.json({token: 'JWT '+token, data: user});
			}else{
				res.status(401).json({errors: {form: 'Invalid credentials'}});
			}
		}else{
			res.status(401).json({errors: {form: 'Invalid credentials'}});
		}
	});	
});

export default router;