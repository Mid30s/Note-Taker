const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Get all notes
router.get('/', (req, res) => {
  const notesData = JSON.parse(fs.readFileSync('./db/db.json'));
  res.json(notesData);
});

// Add a new note
router.post('/', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();
  const notesData = JSON.parse(fs.readFileSync('./db/db.json'));
  notesData.push(newNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(notesData));
  res.json(notesData);
});

// Delete a note with a given id
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server error' });
    }
    const notes = JSON.parse(data);

    // Use the filter method to create a new array without the deleted note ID
    const updatedNotes = notes.filter((note) => note.id !== id);
    if (notes.length === updatedNotes.length) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Rewrite the db.json file with the updated notes array
    fs.writeFile('./db/db.json', JSON.stringify(updatedNotes), (err) => {
        if (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
      }
      return res.status(200).json({ message: `Note deleted successfully with ID: ${id}`});
    });
    });
});

module.exports = router;
