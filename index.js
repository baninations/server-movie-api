const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

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

app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("users need names");
  }
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("No such user");
  }
});

app.patch("/users/:id/fav/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).json(user);
  } else {
    res.status(400).send("no such user");
  }
});

app.delete("/users/:id/fav/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movieTitle
    );
    res.status(200).json(user);
  } else {
    res.status(400).send("no such user");
  }
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id != id);
    res
      .status(200)
      .send(
        `User ${user.name.toUpperCase()} with id:${user.id} has been deleted`
      );
  } else {
    res.status(400).send("no such user");
  }
});

app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("No such movie");
  }
});

app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("No such genre found");
  }
});

app.get("/movies/directors/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(
    (movie) => movie.director.Name === directorName
  ).director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("No such director found");
  }
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
