const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  mongoose = require("mongoose"),
  Models = require("./models.js"),
  Movies = Models.Movie,
  Users = Models.user;

mongoose.connect("mongodb://127.0.0.1:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(express.static("public"));

let users = [
  {
    id: 1,
    name: "Kim",
    favoriteMovies: [],
  },
  {
    id: 2,
    name: "Joe",
    favoriteMovies: ["The fountain"],
  },
];

let movies = [
  {
    Title: "21",
    Description:
      "Inspired by real events and people, 21 is about six MIT students who become trained to be experts in card counting in Black Jack and subsequently took Vegas casinos for millions in winnings.",
    Genre: {
      Name: "Crime",
      Description:
        "Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre.",
    },
    director: {
      Name: "Robert Luketic",
      Bio: "Robert Luketic is an Australian film director. His films include Legally Blonde, Monster-in-Law, 21, Killers, and Paranoia.",
      Birth: 1973,
    },
    ImageURL:
      "https://en.wikipedia.org/wiki/21_%282008_film%29#/media/File:21_(2008_film).jpg",
    Featured: false,
  },
  {
    Title: "Serendipity",
    Description:
      "A couple search for each other years after the night they first met, fell in love, and separated, convinced that one day they'd end up together.",
    Genre: {
      Name: "Comedy",
      Description:
        "Comedy is a genre of entertainment that is designed to make audiences laugh.",
    },
    director: {
      Name: "Peter Chelsom",
      Bio: "Peter Chelsom is a British film director, writer, and actor. He has directed such films as Hector and the Search for Happiness, Serendipity, and Shall We Dance?",
      Birth: 1956,
    },
    ImageURL:
      "https://en.wikipedia.org/wiki/Serendipity_(film)#/media/File:Serendipity_poster.jpg",
    Featured: true,
  },
  {
    Title: "Good Will Hunting",
    Description:
      "Good Will Hunting, a janitor at M.I.T., has a gift for mathematics, but needs help from a psychologist to find direction in his life.",
    Genre: {
      Name: "Drama",
      Description:
        "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.",
    },
    director: {
      Name: "Gus Van Sant",
      Bio: "Gus Green Van Sant Jr. is an American film director, producer, photographer, and musician. He has earned acclaim as both an independent and mainstream filmmaker.",
      Birth: 1952,
    },
    ImageURL:
      "https://en.wikipedia.org/wiki/Good_Will_Hunting#/media/File:Good_Will_Hunting.png",
    Featured: false,
  },
  {
    Title: "Remember Me",
    Description:
      "A romantic drama centered on two new lovers: Tyler, whose parents have split in the wake of his brother's suicide, and Ally, who lives each day to the fullest since witnessing her mother's murder.",
    Genre: {
      Name: "Drama",
      Description:
        "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.",
    },
    director: {
      Name: "Allen Coulter",
      Bio: "Allen Coulter is an American television and film director, credited with a number of successful television programs. He has directed two feature films, Hollywoodland, a film regarding the questionable death of George Reeves starring Adrien Brody, Diane Lane, and Ben Affleck, and the 2010 film Remember Me.",
      Birth: 1969,
    },
    ImageURL:
      "https://en.wikipedia.org/wiki/Remember_Me_(2010_film)#/media/File:Remember_me_film_poster.jpg",
    Featured: false,
  },
  {
    Title: "The Intern",
    Description:
      "Seventy-year-old widower Ben Whittaker has discovered that retirement isn't all it's cracked up to be. Seizing an opportunity to get back in the game, he becomes a senior intern at an online fashion site, founded and run by Jules Ostin.",
    Genre: {
      Name: "Comedy",
      Description:
        "Comedy is a genre of entertainment that is designed to make audiences laugh.",
    },
    director: {
      Name: "Nancy Jane Meyers",
      Bio: "Nancy Jane Meyers is an American filmmaker. She has written, produced, and directed many critically and commercially successful films. She was nominated for the Academy Award for Best Original Screenplay for Private Benjamin.",
      Birth: 1949,
    },
    ImageURL:
      "https://en.wikipedia.org/wiki/The_Intern_(2015_film)#/media/File:The_Intern_Poster.jpg",
    Featured: false,
  },
];

// Creates a new User
app.post("/users", async (req, res) => {
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//GET all movies
app.get("/movies", async (req, res) => {
  await Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// GET movie by title
app.get("/movies/:Title", async (req, res) => {
  await Movies.findOne({ Title: req.params.Title })
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// GET data about a genre
app.get("/movies/genre/:GenreName", async (req, res) => {
  await Movies.findOne({ "Genre.Name": req.params.GenreName })
    .then((genreName) => {
      res.json(genreName.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// GET data about a director
app.get("/movies/director/:Director", async (req, res) => {
  await Movies.findOne({ "Director.Name": req.params.Director })
    .then((directorName) => {
      res.json(directorName.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Updates user information
app.put("/users/:_id", async (req, res) => {
  await Users.findOneAndUpdate(
    { _id: req.params._id },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
    },
    { new: true }
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Adds a movie to users Favorites list
app.post("/users/:Username/movies/:MovieID", async (req, res) => {
  await Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavoriteMovies: req.params.MovieID },
    },
    { new: true }
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Deletes user
app.delete("/users/:Username", async (req, res) => {
  await Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Deletes movie from favorites list
app.delete("/users/:Username/movies/:MovieID", async (req, res) => {
  await Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $pull: { FavoriteMovies: req.params.MovieID },
    },
    { new: true }
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
