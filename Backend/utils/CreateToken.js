const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d",  // JWT token expiration: 1 day
    });

    // Set cookie options
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",  // Secure flag only in production
        sameSite: "strict",  // Restrict to same-site requests
        maxAge: 1 * 24 * 60 * 60 * 1000, // Cookie lifespan matches JWT token (1 day)
    });

    return token;
}

module.exports = generateToken;
