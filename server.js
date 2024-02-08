const express = require('express');
const path = require('path');

const { readNotesFromFile } = require('./readNotesFromFile'); 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/notes', (req, res) => {
    const notes = readNotesFromFile();
  
    res.json(notes);
  });

app.post('/api/notes', (req, res) => {
  const newNote = req.body;

});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});