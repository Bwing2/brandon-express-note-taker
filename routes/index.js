const express = require("express");

// Imports modular routers for notes and db
const notesRouter = require("./notes");
const dbRouter = require("./db");

const app = express();

app.use("/notes", notesRouter);

app.use("/db", dbRouter);

module.exports = app;
