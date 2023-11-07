const express = require("express");
const path = require("path");
const api = require("./routes/index.js");

const app = express();

const PORT = process.env.PORT || 3001;

// Middleware for Parsing JSON and urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", api);

// GET route for notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/pages/notes.html"));
});

// GET route for homepage
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
