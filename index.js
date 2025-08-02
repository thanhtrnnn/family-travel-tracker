import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 6969;

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
];

async function checkVisited() {
  const result = await db.query(
    "SELECT country_code FROM user_visited_countries WHERE user_id = $1",
    [currentUserId]
  );
  return result.rows.map((country) => country.country_code);
}

async function getCurrentUser() {
  const result = await db.query("SELECT * FROM users");
  users = result.rows;
  return users.find((user) => user.id == currentUserId);
}

app.get("/", async (req, res) => {
  const countries = await checkVisited();
  const currentUser = await getCurrentUser();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUser.color,
  });
});

function inputSanitizer(input) {
  const trimmedInput = input.trim();
  if (trimmedInput.length <= 3) {
    return trimmedInput.toUpperCase();
  }
  // Capitalize the first letter of each word, lowercase the rest
  return trimmedInput
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
app.post("/add", async (req, res) => {
  const input = inputSanitizer(req.body["country"]);
  const currentUser = await getCurrentUser();
  console.log("Input country sanitized:", input);
  
  if (input.length > 0) {
    let result;
    if (input.length <= 3) {
      // Assume it's a country code
      result = await db.query(
        "SELECT country_code FROM countries WHERE country_code ILIKE $1",
        [input]
      );
    } else {
      // Assume it's a country name
      result = await db.query(
        "SELECT country_code FROM countries WHERE country_name ILIKE '%' || $1 || '%'",
        [input]
      );
    }

    if (result.rows.length !== 0) {
      try {
        // "INSERT INTO <table_name> (<column_name>) VALUES (<value>)"
        // loosely match country name
        const countryCode = result.rows[0].country_code;
        await db.query(
          "INSERT INTO user_visited_countries (country_code, user_id) VALUES ($1, $2)", 
          [countryCode, currentUserId]
        );
        res.redirect("/");
      } catch (error) {
        // Handle duplicate entry error
        if (error.code === '23505') {
          // Fetch the updated list of visited countries
          const countries = await checkVisited();
          res.render("index.ejs", {
            countries: countries,
            total: countries.length,
            users: users,
            color: currentUser.color,
            error: "This country has already been added, try again."
          });
        } else {
          console.error("Error inserting country:", error);
          res.status(500).send("Internal Server Error");
        }
      }
    } else {
      // Fetch the list of visited countries
      const countries = await checkVisited();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        users: users,
        color: currentUser.color,
        error: "This country does not exist, try again."
      });
    }
  } else {
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {  
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  const newUser = {
    name: req.body["name"],
    color: req.body["color"],
  };
  // Insert the new user into the database
  const result = await db.query(
    "INSERT INTO users (name, color) VALUES ($1, $2) RETURNING *",
    [newUser.name, newUser.color]
  );

  currentUserId = result.rows[0].id;
  res.redirect("/");
});

app.post("/user", async (req, res) => {
  if (req.body.add === "new") {
    res.render("new.ejs");
  } else {
    currentUserId = req.body.user;
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// TODO:
// DONE 1. Validate existing users before adding a new one.
// DONE 2. Copy validation logic from individual travel tracker to family travel tracker.
// 3. Add a delete user functionality.