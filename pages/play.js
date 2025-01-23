const fs = require('fs');
const path = require('path');

let flashcards = [];
let currentIndex = 0;
let isFlipped = false;

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

function startPlaying() {
  const setSelect = document.getElementById('setSelect');
  const directionSelect = document.getElementById('directionSelect');
  const setPath = path.join(__dirname, '../sets', `${setSelect.value}.json`);

  if (fs.existsSync(setPath)) {
    flashcards = JSON.parse(fs.readFileSync(setPath));

    if (directionSelect.value === 'shuffle') {
      flashcards = shuffleArray(flashcards);
    } else if (directionSelect.value === 'backward') {
      flashcards.reverse();
    }

    document.getElementById('setup').style.display = 'none';
    document.getElementById('flashcard').style.display = 'block';
    showCard();
  }
}

function showCard() {
  const cardText = document.getElementById('cardText');
  if (currentIndex < flashcards.length) {
    cardText.textContent = flashcards[currentIndex].front;
    isFlipped = false;
  } else {
    cardText.textContent = 'End of set!';
  }
}

function flipCard() {
  const cardText = document.getElementById('cardText');
  if (isFlipped) {
    cardText.textContent = flashcards[currentIndex].front;
  } else {
    cardText.textContent = flashcards[currentIndex].back;
  }
  isFlipped = !isFlipped;
}

function nextCard() {
  currentIndex++;
  showCard();
}

function exitSet() {
  window.location.href = '../index.html';
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

populateSetDropdown();