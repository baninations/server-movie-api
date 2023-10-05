# myFlix Express.js API

## Description

The myFlix Express.js API is the server-side component of the myFlix movie application. This API handles user registration and authentication, as well as provides access to movie information, director details, and genre data. It is designed to work in conjunction with the myFlix Angular client-side application.

## Endpoints

- `POST /users` - Create a new user.
- `GET /movies` - Get a list of all movies.
- `GET /movies/:Title` - Get movie details by title.
- `GET /movies/genre/:GenreName` - Get movies by genre.
- `GET /movies/director/:Director` - Get movies by director.
- `GET /users/:_id` - Get user information by user ID.
- `PUT /users/:_id` - Update user information by user ID.
- `POST /users/:Username/movies/:MovieID` - Add a movie to a user's favorites list.
- `DELETE /users/:Username` - Delete a user by username.
- `DELETE /users/:Username/movies/:MovieID` - Remove a movie from a user's favorites list.

## Technical Requirements

- Built with Express.js.
- Utilizes MongoDB for data storage.
- Implements user registration and authentication.
- Includes CORS middleware for cross-origin requests.
- Utilizes JWT authentication with Passport.js.
- Hosted on a platform of your choice.

## Getting Started

1. Clone the repository.
2. Install Node.js and npm.
3. Run `npm install` to install dependencies.
4. Set up your MongoDB database.
5. Start the server using `npm start`.

## Project Structure

- `server.js` - Main server file.
- `models.js` - MongoDB data models.
- `auth.js` - User authentication logic.
- `passport.js` - Passport configuration for JWT authentication.
- `config.js` - Configuration variables.
- `routes/` - API route handlers.
- `public/` - Static files (if any).

