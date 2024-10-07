const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imagePath: String,
    featured: Boolean,
    genre: {
        name: String,
        description: String,
    },
    director: {
        name: String,
        bio: String,
        birthDate: Date,
        dearthDate: Date
    }
});

let userSchema = mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: Date,
    createdDate: Date,
    favorite: [{ type: mongoose.Schema.Types.ObjectId, ref: 'movie' }]
});

let movies = mongoose.model('movies', movieSchema);
let users = mongoose.model('users', userSchema);

module.exports.movies = movies;
module.exports.users = users;