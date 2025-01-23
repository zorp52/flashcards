const fs = require('fs');
const path = require('path');

let flashcards = [];
let currentSet = '';

function populateSetDropdown() {
  const setSelect = document.getElementById('setSelect');
  const setsDir = path.join(__dirname, '../sets');
  const files = fs.readdirSync(setsDir);

  files.forEach(file => {
    if (file.endsWith('.json')) {
      const option = document.createElement('option');
      option.value = file.replace('.json', '');
      option.textContent = file.replace('.json', '');
      setSelect.appendChild(option);
    }
  });
}

function loadSet() {
  const setSelect = document.getElementById('setSelect');
  currentSet = setSelect.value;
  const setPath = path.join(__dirname, '../sets', `${currentSet}.json`);

  if (fs.existsSync(setPath)) {
    flashcards = JSON.parse(fs.readFileSync(setPath));
    renderFlashcards();
  }
}

function renderFlashcards() {
  const container = document.getElementById('flashcards');
  container.innerHTML = '';
  flashcards.forEach((card, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.innerHTML = `
      <input type="text" value="${card.front}" onchange="updateCard(${index}, 'front', this.value)">
      <input type="text" value="${card.back}" onchange="updateCard(${index}, 'back', this.value)">
      <button onclick="deleteCard(${index})">Delete</button>
    `;
    container.appendChild(cardDiv);
  });
}

function addFlashcard() {
  flashcards.push({ front: '', back: '' });
  renderFlashcards();
}

function updateCard(index, key, value) {
  flashcards[index][key] = value;
}

function deleteCard(index) {
  flashcards.splice(index, 1);
  renderFlashcards();
}

function saveSet() {
  const setPath = path.join(__dirname, '../sets', `${currentSet}.json`);
  fs.writeFileSync(setPath, JSON.stringify(flashcards));
  alert('Set saved!');
}

function exitEditing() {
  window.location.href = '../index.html';
}

populateSetDropdown();