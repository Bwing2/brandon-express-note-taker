const express = require("express");

// Imports modular router for notes
const notesRouter = require("./notes");

const app = express();

// Creates notes route
app.use("/notes", notesRouter);

module.exports = app;
