const express = require("express"),
    morgan = require("morgan"),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

const app = express();
app.use(bodyParser.json());


const movieList = [
    {
        "Title": "Avatar",
        "Description": "A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
        "Year": "2009",
        "Genre": [
            {
                "name": "Action",
                "Description": "Action Movie"
            },
            {
                "name": "Fantasy",
                "Description": "Fantasy Movie"
            }
        ],
        "Director": {
            "name": "James Cameron",
            "Bio": "Bio fo Director",
            "Birth": "xx"
        },
        "Poster": "http://ia.media-imdb.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_SX300.jpg",
        "Images": [
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMjEyOTYyMzUxNl5BMl5BanBnXkFtZTcwNTg0MTUzNA@@._V1_SX1500_CR0,0,1500,999_AL_.jpg",
            "https://images-na.ssl-images-amazon.com/images/M/MV5BNzM2MDk3MTcyMV5BMl5BanBnXkFtZTcwNjg0MTUzNA@@._V1_SX1777_CR0,0,1777,999_AL_.jpg",
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY2ODQ3NjMyMl5BMl5BanBnXkFtZTcwODg0MTUzNA@@._V1_SX1777_CR0,0,1777,999_AL_.jpg",
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxOTEwNDcxN15BMl5BanBnXkFtZTcwOTg0MTUzNA@@._V1_SX1777_CR0,0,1777,999_AL_.jpg",
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMTYxMDg1Nzk1MV5BMl5BanBnXkFtZTcwMDk0MTUzNA@@._V1_SX1500_CR0,0,1500,999_AL_.jpg"
        ]
    },
    {
        "Title": "I Am Legend",
        "Description": "Years after a plague kills most of humanity and transforms the rest into monsters, the sole survivor in New York City struggles valiantly to find a cure.",
        "Year": "2007",
        "Genre": [
            {
                "name": "Action",
                "Description": "Action Movie"
            },
            {
                "name": "Horror",
                "Description": "Horror Movie"
            }
        ],
        "Director": {
            "name": "Francis Lawrence",
            "Bio": "Bio fo Director",
            "Birth": "xx"
        },
        "Poster": "http://ia.media-imdb.com/images/M/MV5BMTU4NzMyNDk1OV5BMl5BanBnXkFtZTcwOTEwMzU1MQ@@._V1_SX300.jpg",
        "Images": [
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMTI0NTI4NjE3NV5BMl5BanBnXkFtZTYwMDA0Nzc4._V1_.jpg",
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMTIwMDg2MDU4M15BMl5BanBnXkFtZTYwMTA0Nzc4._V1_.jpg",
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMTc5MDM1OTU5OV5BMl5BanBnXkFtZTYwMjA0Nzc4._V1_.jpg",
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMTA0MTI2NjMzMzFeQTJeQWpwZ15BbWU2MDMwNDc3OA@@._V1_.jpg"
        ]
    },
    {
        "Title": "300",
        "Description": "King Leonidas of Sparta and a force of 300 men fight the Persians at Thermopylae in 480 B.C.",
        "Year": "2006",
        "Genre":
            [
                {
                    "name": "Action",
                    "Description": "Action Movie"
                },
                {
                    "name": "Fantasy",
                    "Description": "Fantasy Movie"
                }
            ],
        "Director": {
            "name": "Zack Snyder",
            "Bio": "Bio fo Director",
            "Birth": "xx"
        },
        "Poster": "http://ia.media-imdb.com/images/M/MV5BMjAzNTkzNjcxNl5BMl5BanBnXkFtZTYwNDA4NjE3._V1_SX300.jpg",
        "Images": [
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMwNTg5MzMwMV5BMl5BanBnXkFtZTcwMzA2NTIyMw@@._V1_SX1777_CR0,0,1777,937_AL_.jpg",
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQwNTgyNTMzNF5BMl5BanBnXkFtZTcwNDA2NTIyMw@@._V1_SX1777_CR0,0,1777,935_AL_.jpg",
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMTc0MjQzOTEwMV5BMl5BanBnXkFtZTcwMzE2NTIyMw@@._V1_SX1777_CR0,0,1777,947_AL_.jpg"
        ]
    }
];

// Get all movies from the list
app.get('/movies', (req, res) => {
    res.json(movieList);
});

// Get a movie data by title
app.get('/movies/:title', (req, res) => {
    res.json(movieList.find((movie) => { return movie.Title === req.params.title }));
});

// Get all genre data of a movie by title
app.get('/movies/:title/genre/:name', (req, res) => {
    res.send('Successful GET request returning data of given genre of a movie');
});

// Get the director data of a movie by title
app.get('/movies/:title/director', (req, res) => {
    res.send('Successful GET request returning data of director of the movie');
});

// Create a new user with email
app.post('/users', (req, res) => {
    res.status(201).send('Successful POST request returning created user data');
});

// Update user data with registered email
app.put('/users/:email/:username', (req, res) => {
    res.status(200).send('Successful PUT request returning updated user info');
});

// Remove or deregister an existing user
app.delete('/users/:email', (req, res) => {
    res.status(200).send('Successful DELETE request returning delete user status');
});

// Add a movie to the user's favorites list
app.put('/users/:email/favorites/:movie', (req, res) => {
    res.status(200).send('Successful POST request returning added favorites movie');
});

// Remove a movie from the user's favorites list
app.delete('/users/:email/favorites/:movie', (req, res) => {
    res.status(200).send('Successful DELETE request returning deleted favorites movie status');
});

app.use(express.static('public'));

// Hanle all other routes
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