import passportJwt from 'passport-jwt';
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
import { User, getUserById } from '../models/user';
import config from './database';

export function initPassport (passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.jwtSecret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        getUserById(jwt_payload.user._id, (err, user) => {
            if(err){
                return done(err, false);
            }
            
            if(user){
                return done(null, user);
            }else{
                return done(null, false);
            }
        });
    }));
} 