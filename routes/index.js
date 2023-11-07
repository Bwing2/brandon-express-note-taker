const express = require("express");

// Imports modular routers for notes and db
const notesRouter = require("./notes");

const app = express();

app.use("/notes", notesRouter);

module.exports = app;
