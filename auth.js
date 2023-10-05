/**
 * Secret key for JWT token generation.
 * @type {string}
 */
const jwtSecret = "your_jwt_secret";

const jwt = require("jsonwebtoken"),
  passport = require("passport");

require("./passport");

/**
 * Generates a JWT token for a user.
 * @param {Object} user - The user object for which the token is generated.
 * @returns {string} - The generated JWT token.
 */
let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: "7d",
    algorithm: "HS256",
  });
};

/**
 * Module for handling user login.
 * @module login
 * @param {Object} router - The Express router on which the login routes are defined.
 */
module.exports = (router) => {
  /**
   * POST login.
   * @function
   * @name POST /login
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   */
  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: "Something is not right",
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
    })(req, res);
  });
};
