import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';
import expressValidator from 'express-validator';
import session from 'express-session';
import mongoose from 'mongoose';
import config from './config/database';
import passport from 'passport';
import { initPassport } from './config/passport';

import auth from './routes/auth';
import register from './routes/register';
import posts from './routes/posts';
import search from './routes/search';
import users from './routes/users';
import profile from './routes/profile';

// Define app
const app = express();

// Port number
const port = 3000;

mongoose.Promise = global.Promise;

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
	console.log('Connected to database '+ config.database);
});

mongoose.connection.on('error', (err) => {
	console.log('Database error: '+ err);
});

const compiler = webpack(webpackConfig);

// Use webpack-hot-middleware
app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo:true,
}));

// Use webpack middleware
app.use(webpackHotMiddleware(compiler));

// Use cors middleware
app.use(cors());

// Use body-parser middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

initPassport(passport);

app.use(expressValidator());

app.use('/api/auth', auth);
app.use('/api/register', register);
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/search', search);
app.use('/profile', profile);

// Get index page
app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Run server on the defined port
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});