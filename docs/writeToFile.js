const fs = require('fs');
const path = require('path');

function writeNotesToFile(notes) {
  const filePath = path.join(__dirname, 'db', 'db.json');
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
}

module.exports = { writeNotesToFile };