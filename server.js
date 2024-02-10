const express = require('express');
const path = require('path');

const { readNotesFromFile } = require('./readFromFile'); 
const { writeNotesToFile } = require('./writeToFile');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('docs'));

app.get('/notes', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'docs', 'notes.html'));
  } catch (error) {
    console.error('Error serving notes.html:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('*', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'docs', 'index.html'));
  } catch (error) {
    console.error('Error serving index.html:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/notes', (req, res) => {
  try {
    const notes = readNotesFromFile();
    console.log(notes);
    res.json(notes);
  } catch (error) {
    console.error('Error reading notes from file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/notes', (req, res) => {
  try {
    const newNote = req.body;
    const notes = readNotesFromFile();
    newNote.id = Math.random().toString(36);
    notes.push(newNote);
    writeNotesToFile(notes);
    res.json(newNote);
  } catch (error) {
    console.error('Error saving note:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});