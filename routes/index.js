const express = require('express');
const app = express.Router();

const notesRoutes = require('./notes');

app.use('/notes', notesRoutes);

module.exports = app;
