const express = require("express"),
  morgan = require("morgan");

const app = express();

const port = 8080;

let movies = [
  {
    movie: "21",
    Year: "2008",
  },
  {
    movie: "Catch me if you can",
    Year: "2002",
  },
  {
    movie: "Good will hunting",
    Year: "1997",
  },
  {
    movie: "Serendipity",
    Year: "2001",
  },
  {
    movie: "Remember me",
    Year: "2010",
  },
  {
    movie: "Titanic",
    Year: "1997",
  },
  {
    movie: "Age of Adeline",
    Year: "2015",
  },
  {
    movie: "Harry Potter(All)",
    Year: "2001-2011",
  },
  {
    movie: "The Intern",
    Year: "2015",
  },
  {
    movie: "Scarface",
    Year: "1983",
  },
];

app.use(morgan("common"));
app.use(express.static("public"));

app.get("/movies", (req, res) => {
  res.json(movies);
});

app.get("/", (req, res) => {
  res.send(
    "Hello and welcome to myFlix site, it is currently under construction but will soon be done and ready for ya'll"
  );
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log("Server is running at port: " + port);
});
