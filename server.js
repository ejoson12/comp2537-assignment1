// Load the necessary modules
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

// Load the user model
//const User = require('./models/user');

// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Create an Express app
const app = express();

// Set up session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// Set up middleware to parse the request body
app.use(express.urlencoded({ extended: true }));

// Set up middleware to serve static files
app.use(express.static('public'));

// Set up middleware to store the user's name in the session
app.use((req, res, next) => {
    if (req.session.user) {
        res.locals.username = req.session.user.name;
    }
    next();
});

// Home page
app.get('/', (req, res) => {
    if (req.session.user) {
        res.send(`Hello, ${req.session.user.name}.<br><a href="/members">Members Area</a><br><a href="/logout">Logout</a>`);
    } else {
        res.send('<a href="/signup">Sign up</a><br><a href="/login">Log in</a>');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.redirect('/');
    });
});


// 404 page
app.use((req, res) => {
    res.status(404).send('404');
});
app.get('*', (req, res) => {
    res.status(404).send('Page not found');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

