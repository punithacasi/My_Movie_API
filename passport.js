const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Models = require('./models.js'),
    passportJWT = require('passport-jwt');

let users = Models.users,
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt;

/**
 * Local authentication strategy using Passport.js.
 * 
 * This strategy authenticates users by validating the `Username` and `Password` 
 * fields. The provided username is checked against the database, and the password 
 * is validated using the `validatePassword` method.
 * 
 * If authentication is successful, the user object is returned; otherwise, an error 
 * message is passed to the callback indicating whether the username or password is incorrect.
 * @function 
 * @name passport /use
 * @param {string} username - The username provided by the user for authentication.
 * @param {string} password - The password provided by the user for authentication.
 * @param {Function} callback - The callback function to be called after authentication.
 * 
 * @returns {void} The callback is called with either an error or the authenticated user object.
 * 
 * @throws {Error} Throws an error if the database query fails.
 */
passport.use(
    new LocalStrategy(
        {
            usernameField: 'Username',
            passwordField: 'Password',
        },
        async (username, password, callback) => {
            console.log(`${username} ${password}`);
            /**
            * The authentication callback to validate the user's credentials.
            *
            * @param {string} username - The username provided by the user.
            * @param {string} password - The password provided by the user.
            * @param {Function} callback - The callback to invoke after authentication.
            * @returns {void} The callback is invoked with either the authenticated user object or an error.
            * 
            * @throws {Error} Throws an error if there is an issue with the database query.
            */
            await users.findOne({ userName: username })
                .then((user) => {
                    if (!user) {
                        console.log('incorrect username');
                        return callback(null, false, {
                            message: 'Incorrect username or password.',
                        });
                    }
                    if (!user.validatePassword(password)) {
                        console.log('incorrect password');
                        return callback(null, false, { message: 'Incorrect password.' });
                    }
                    console.log('finished');
                    return callback(null, user);
                })
                .catch((error) => {
                    if (error) {
                        console.log(error);
                        return callback(error);
                    }
                })
        }
    )
);

/**
 * Passport.js JWT Strategy for authenticating users.
 * 
 * This strategy extracts the JWT token from the `Authorization` header (as a Bearer token), 
 * verifies it using the provided secret key, and retrieves the user from the database 
 * based on the decoded JWT payload.
 * 
 * @param {Object} jwtPayload - The decoded JWT payload.
 * @param {string} jwtPayload._id - The user ID decoded from the JWT.
 * @param {Function} callback - The callback to be invoked after authentication.
 * @name POST /login
 * @returns {Promise<void>} Resolves with the user object if authentication is successful, 
 * or with an error if authentication fails.
 * 
 * @throws {Error} Throws an error if the user cannot be found or there is a database error.
 */
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
}, async (jwtPayload, callback) => {
    return await users.findById(jwtPayload._id)
        .then((user) => {
            return callback(null, user);
        })
        .catch((error) => {
            return callback(error)
        });
}));