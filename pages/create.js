const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

document.getElementById('createForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const setName = document.getElementById('setName').value;
  const setPath = path.join(__dirname, '../sets', `${setName}.json`);

  fs.writeFileSync(setPath, JSON.stringify([{ front: '', back: '' }]));
  window.location.href = `edit.html?set=${setName}`;
});