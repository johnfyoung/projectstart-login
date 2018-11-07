// just for authentication
import express from 'express';
const router = new express.Router();
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import keys from '../../config/keys';
import passport from 'passport';

// Load Input Validation
import validateRegisterInput from '../../validation/register';
import validateLoginInput from '../../validation/login';

// Load User model
import User from '../../models/User';

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', (req, res) => {
	const {
		errors,
		isValid
	} = validateRegisterInput(req.body);

	// check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({
		email: req.body.email
	})
		.then((user) => {
			if (user) {
				errors.email = 'Email already exists';
				return res.status(400).json(errors);
			} else {
				const avatar = gravatar.url(req.body.email, {
					s: '200', // size
					r: 'pg', // rating
					d: 'mm' // default
				});
				const newUser = new User({
					name: req.body.name,
					email: req.body.email,
					avatar,
					password: req.body.password
				});

				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (crypterr, hash) => {
						if (crypterr) throw crypterr;
						newUser.password = hash;
						newUser.save()
							.then((user) => res.json(user))
							.catch((err) => console.error(err));
					});
				});
			}
		});
});

// @route   GET api/auth/login
// @desc    login a user / return a JWT
// @access  Public
router.post('/login', (req, res) => {
	const {
		errors,
		isValid
	} = validateLoginInput(req.body);

	// check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	// find user by email
	User.findOne({
		email
	})
		.then((user) => {
			// Check for user
			if (!user) {
				errors.email = 'User not found';
				return res.status(404).json(errors);
			}

			// check password
			bcrypt.compare(password, user.password)
				.then((isMatch) => {
					if (isMatch) {
						// User matched
						const payload = {
							id: user.id,
							name: user.name,
							avatar: user.avatar
						};
						// Sign the token
						jwt.sign(
							payload,
							keys.secretOrKey, {
								expiresIn: 3600
							},
							(err, token) => {
								res.json({
									success: true,
									token: 'Bearer ' + token
								});
							});
					} else {
						errors.password = ' ';
						return res.status(400).json(errors);
					}
				});
		});
});

// @route   GET api/auth/current
// @desc    return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', {
	session: false
}), (req, res) => {
	if (req.user) {
		res.json({
			id: req.user.id,
			name: req.user.name,
			email: req.user.email,
			avatar: req.user.avatar
		});
	}
});

export default router;