import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User';
import keys from '../config/keys';

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

const p = (passport) => {
	passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
		User.findById(jwtPayload.id)
			.then((user) => {
				if (user) {
					return done(null, user);
				}

				return done(null, false);
			})
			.catch((err) => console.log(err));
	}));
};

export default p;