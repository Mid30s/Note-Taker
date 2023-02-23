const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public folder
app.use(express.static('public'));




// API routes
app.get('/api/notes', (req, res) => {
  // Read the db.json file and return all saved notes as JSON
  const notesData = JSON.parse(fs.readFileSync('./db/db.json'));
  res.json(notesData);
});

app.post('/api/notes', (req, res) => {
  // Add a new note to the db.json file with a unique id
  const newNote = req.body;
  newNote.id = uuidv4();
  const notesData = JSON.parse(fs.readFileSync('./db/db.json'));
  notesData.push(newNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(notesData));
  res.json(notesData);
});


// HTML routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
