const fs = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname, 'db', 'db.json');

function readNotesFromFile() {
  if (fs.existsSync(dbFilePath)) {
    const data = fs.readFileSync(dbFilePath, 'utf8');
    const notes = JSON.parse(data);
    return notes;
  } else {
    return [];
  }
}

module.exports = { readNotesFromFile };