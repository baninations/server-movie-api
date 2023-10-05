/**
 * Required dependencies
 */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/**
 * Define the schema for movies in the database.
 * @typedef {Object} MovieSchema
 * @property {string} Title - The title of the movie (required).
 * @property {string} Description - The description of the movie (required).
 * @property {Object} Genre - The genre of the movie, containing Name and Description fields.
 * @property {string} Genre.Name - The name of the genre.
 * @property {string} Genre.Description - A description of the genre.
 * @property {Object} Director - The director of the movie, containing Name and Bio fields.
 * @property {string} Director.Name - The name of the director.
 * @property {string} Director.Bio - The biography of the director.
 * @property {string[]} Actors - An array of actor names in the movie.
 * @property {string} ImagePath - The path to the movie's image.
 * @property {boolean} Featured - Indicates whether the movie is featured.
 */
const movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean,
});

/**
 * Define the schema for users in the database.
 * @typedef {Object} UserSchema
 * @property {string} Username - The username of the user (required).
 * @property {string} Password - The hashed password of the user (required).
 * @property {string} Email - The email address of the user (required).
 * @property {Date} Birthday - The birthday of the user.
 * @property {mongoose.Types.ObjectId[]} FavoriteMovies - An array of movie IDs representing the user's favorite movies.
 */
const userSchema = mongoose.Schema({
  // _id: { type: String }, // (optional) Add if needed
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

/**
 * Hashes a user's password using bcrypt.
 * @function
 * @param {string} password - The user's plain text password.
 * @returns {string} - The hashed password.
 */
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

/**
 * Validates a user's password by comparing it with the hashed password stored in the database.
 * @method
 * @param {string} password - The plain text password to validate.
 * @returns {boolean} - True if the provided password matches the hashed password, false otherwise.
 */
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

/**
 * Define the "Movie" model based on the movie schema.
 * @type {mongoose.Model}
 */
const Movie = mongoose.model("Movie", movieSchema);

/**
 * Define the "User" model based on the user schema.
 * @type {mongoose.Model}
 */
const User = mongoose.model("User", userSchema);

// Export the models
module.exports.Movie = Movie;
module.exports.User = User;
