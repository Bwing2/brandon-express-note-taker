const notes = require("express").Router();
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("../helpers/fsUtils");
const { v4: uuidv4 } = require("uuid");

// GET route for getting all notes
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST route for saving information to db.json
notes.post("/", (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newTask = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newTask, "./db/db.json");
    res.json("Task added successfully!");
  } else {
    res.error("Error adding task.");
  }
});

// DELETE route for removing specific notes using their ID
notes.delete("/:id", (req, res) => {
  readFromFile("./db/db.json").then((data) => {
    // Sets parsed data as a variable that we can manipulate
    const dbData = JSON.parse(data);

    // Sets value of id parameter from URL request to variable
    const requestId = req.params.id;

    // For loop looking over all elements in array until id's match
    for (let i = 0; i < dbData.length; i++) {
      if (dbData[i].id === requestId) {
        let deleteNote = dbData[i];

        // Splice targets current index with i, and 1 to remove a single element from array
        dbData.splice(i, 1);
        console.log(requestId, deleteNote);
        writeToFile("./db/db.json", dbData);
        return res.json(dbData);
      }
    }
  });
});

module.exports = notes;
