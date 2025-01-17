const jwtSecret = 'your_jwt_secret'; // This has to be the same key used in JWTStrategy

const jwt = require('jsonwebtoken'),
    passport = require('passport');

require('./passport.js'); // local passport file

let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.userName, // This is the username being encoded in the JWT
        expiresIn: '7d', // This specifies that the token will expire in 7 days
        algorithm: 'HS256', // This is the elgorithm used to "sign" or encide the values of the JWT
    });
};

/**
    * POST login
    * 
    * Authenticates the user using the local Passport strategy. If authentication is successful,
    * a JWT token is generated and returned in the response. If authentication fails, an error message
    * is sent back.
    * 
    * @function
    * @name POST /login authenticate
    * @param {Object} req - The Express request object. It contains the `Username` and `Password` fields 
    *                       submitted by the client in the body.
    * @param {Object} res - The Express response object. It is used to send the response back to the client.
    * 
    * @returns {void} Sends a JSON response containing either the user object and JWT token or an error message.
    * 
    * @throws {Error} Sends a 400 status response if authentication fails or there is an error during login.
    * 
    */
module.exports = (router) => {
    router.post('/login', (req, res) => {
        passport.authenticate(
            'local',
            { session: false },
            (error, user, info) => {
                if (error || !user) {
                    return res.status(400).json({
                        message: 'Something is not right',
                        user: user,
                    });
                }
                req.login(user, { session: false }, (error) => {
                    if (error) {
                        res.send(error);
                    }
                    let token = generateJWTToken(user.toJSON());
                    return res.json({ user, token });
                });
            }
        )(req, res);
    });
};