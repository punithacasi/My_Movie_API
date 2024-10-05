const express = require("express"),
    morgan = require("morgan"),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

const mongoose = require('mongoose');
const Models = require('./models.js');

const movies = Models.movies;
const users = Models.users;

mongoose.connect('mongodb://localhost:27017/cfDB', { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get all movies
app.get('/movies', (req, res) => {
    movies.find()
        .then((movieList) => {
            res.json(movieList);
        })
        .catch((err) => {
            res.status(500).send('Error: ' + err);
        });
});

// Get a movie by title
app.get('/movies/:title', (req, res) => {
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
app.get('/movies/genre/:name', (req, res) => {
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
app.get('/movies/director/:name', (req, res) => {
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
app.get('/users', async (req, res) => {
    users.find()
        .then((userList) => {
            res.json(userList);
        })
        .catch((err) => {
            res.status(500).send('Error: ' + err);
        });
});

// Create a new user
app.post('/users', async (req, res) => {
    await users.findOne({ userName: req.body.userName })
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.userName + ' already exists.');
            } else {
                users.create({
                    userName: req.body.userName,
                    password: req.body.password,
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
app.put('/users/:username', async (req, res) => {
    await users.findOne({ 'userName': req.params.username })
        .then((user) => {
            if (user) {
                console.log(user);
                users.updateOne({ 'userName': req.params.username }, {
                    $set: {
                        userName: req.body.userName,
                        password: req.body.password,
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
app.delete('/users/:username', async (req, res) => {
    console.log(req.params.username)
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
app.put('/users/:username/favorite/:movieid', async (req, res) => {
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
app.delete('/users/:username/favorite/:movieid', async (req, res) => {
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

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});