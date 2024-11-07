const express = require("express"),
    morgan = require("morgan"),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

const mongoose = require('mongoose');
const Models = require('./models.js');

const { check, validationResult } = require('express-validator');

const movies = Models.movies;
const users = Models.users;

//mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect("mongodb+srv://punithacasi:1JKdIwqz8HvJk9TF@myflixdb.cqvnl.mongodb.net/?retryWrites=true&w=majority&appName=myFlixDB", { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

// Get all movies
//app.get('/movies', async (req, res) => {
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await movies.find()
        .then((movieList) => {
            res.status(201).json(movieList);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});


// Get a movie by title
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
    movies.findOne({ 'title': req.params.title })
        .then((movieList) => {
            // Logic here
            res.json(movieList);
        })
        .catch((err) => {
            // Logic here
            res.status(400).send('Error GET Movies');
        });
});

// Get a movie genre by name
app.get('/movies/genre/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
    movies.findOne({ 'genre.name': req.params.name })
        .then((movie) => {
            // Logic here
            res.json(movie.genre);
        })
        .catch((err) => {
            // Logic here
            res.status(400).send('Error GET Movies');
        });
});

// Get a movie director by name
app.get('/movies/director/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
    movies.findOne({ 'director.name': req.params.name })
        .then((movie) => {
            // Logic here
            res.json(movie.director);
        })
        .catch((err) => {
            // Logic here
            res.status(400).send('Error GET Movies');
        });
});

// Get all users
app.get('/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await users.find()
        .then((userList) => {
            res.json(userList);
        })
        .catch((err) => {
            res.status(500).send('Error: ' + err);
        });
});

// Create a new user
app.post('/users',
    [
        check('userName', 'Username is required').isLength({ min: 5 }),
        check('userName', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('password', 'Password is required').not().isEmpty(),
        check('email', 'Email does not appear to be valid').isEmail()
    ], async (req, res) => {
        console.log("TEST");
        console.log(req.body.password);

        // check the validation object for errors
        let errors = validationResult(req);
        console.log(errors);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let hashedPassword = users.hashPassword(req.body.password);
        await users.findOne({ userName: req.body.userName })
            .then((user) => {
                if (user) {
                    return res.status(400).send(req.body.userName + ' already exists.');
                } else {
                    users.create({
                        userName: req.body.userName,
                        password: hashedPassword,
                        email: req.body.email,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        birthDate: req.body.birthDate,
                        createdDate: Date.now()
                    })
                        .then((user) => {
                            res.status(201).json(user);
                        })
                        .catch((error) => {
                            console.log(error);
                            res.status(500).send('Error: ' + error);
                        });
                }
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send('Error: ' + error);
            });
    });

// Update user info by name
app.put('/users/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    // CONDITION TO CHECK ADDED HERE
    if (req.body.userName !== req.params.username) {
        return res.status(400).send('Permission denied');
    }
    // CONDITION ENDS
    let hashedPassword = users.hashPassword(req.body.password);
    await users.findOne({ 'userName': req.params.username })
        .then((user) => {
            if (user) {
                users.updateOne({ 'userName': req.params.username }, {
                    $set: {
                        userName: req.body.userName,
                        password: hashedPassword,
                        email: req.body.email,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        birthDate: req.body.birthDate
                    }
                })
                    .then((user) => {
                        res.status(201).json(user);
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).send('Error: ' + error);
                    });
            } else {
                console.log(user);
                return res.status(401).send(req.params.username + ' does not exists.');
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send('Error: ' + error);
        });
});

// Remove or deregister an existing user
app.delete('/users/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await users.findOne({ 'userName': req.params.username })
        .then((user) => {
            if (user) {
                console.log(user);
                users.deleteOne({ 'userName': req.params.username })
                    .then((user) => {
                        res.status(200).send("User successfully de-registered");
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).send('Error: ' + error);
                    });
            } else {
                console.log(user);
                return res.status(401).send(req.params.username + ' does not exists.');
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send('Error: ' + error);
        });
});

// Add a movie to the user's favorites list
app.put('/users/:username/favorite/:movieid', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await users.findOne({ 'userName': req.params.username })
        .then((user) => {
            if (user) {
                users.updateOne({ 'userName': req.params.username }, {
                    $push: {
                        favorite: req.params.movieid
                    }
                })
                    .then((user) => {
                        res.status(201).json(user);
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).send('Error: ' + error);
                    });
            } else {
                console.log(user);
                return res.status(401).send(req.params.username + ' does not exists.');
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send('Error: ' + error);
        });
});

// Remove a movie from the user's favorites list
app.delete('/users/:username/favorite/:movieid', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await users.findOne({ 'userName': req.params.username })
        .then((user) => {
            if (user) {
                users.updateOne({ 'userName': req.params.username }, {
                    $pull: {
                        favorite: req.params.movieid
                    }
                })
                    .then((user) => {
                        res.status(201).json(user);
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).send('Error: ' + error);
                    });
            } else {
                console.log(user);
                return res.status(401).send(req.params.username + ' does not exists.');
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send('Error: ' + error);
        });
});

app.use(express.static('public'));

// Handle all other routes
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get('/error-test', (req, res, next) => {
    next(new Error('Test error!'));
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log('Listening on Port ' + port);
});