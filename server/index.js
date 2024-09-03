const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const exercisesRouter = require('./routes/exercises');

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const PORT = 3000;
const DIST_DIR = path.resolve(__dirname, '../dist/client');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/HTC-Fitness')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

app.use(express.json());
app.use(express.static(DIST_DIR));

// Session middleware
app.use(session({
  secret: `${process.env.SESSION_SECRET}`,
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: `${process.env.GOOGLE_CLIENT_ID}`,
  clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
  callbackURL: 'http://localhost:3000/auth/google/callback',
}, ((accessToken, refreshToken, profile, cb) => cb(null, profile))));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Not authenticated' });
};

// Google Auth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  successRedirect: '/',
}));

// Check auth
app.get('/api/check-auth', (req, res) => {
  res.json({ isAuthenticated: req.isAuthenticated() });
});

// Logout Route
app.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    req.session.destroy((error) => {
      if (error) {
        return res.status(500).json({ message: 'Error destroying session' });
      }
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });
});

app.use('/api/exercises', exercisesRouter);

app.get('/login', (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

app.get('/', isAuthenticated, (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.info(`Server listening at http://127.0.0.1:${PORT}`);
});
