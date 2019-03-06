import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';

// Get the App
const app = express();

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// DB config and connect
import keys from './config/keys';
const db = keys.mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Passport authentication middleware
app.use(passport.initialize());
import passportStrategy from './config/passport.js';
passportStrategy(passport);

// Routes
import root from './routes/index';
app.use('/', root);

import auth from './routes/api/auth';
app.use('/api/auth', auth);

import install from './routes/api/install';
app.use('/api/install', install);

// Serve static assets if in production and not found
if (process.env.NODE_ENV === 'production') {
    //Set Static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
    })
}

//catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

/**
 * Stops the server
 */
// export function stop() {
//     app.stop();
// }

export default app;