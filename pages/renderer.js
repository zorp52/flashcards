const fs = require('fs');
const path = require('path');

const setsDirectory = 'flashcards';

function loadSets() {
    if (!fs.existsSync(setsDirectory)) {
        fs.mkdirSync(setsDirectory);
    }
    const files = fs.readdirSync(setsDirectory);
    return files.map(file => file.replace('.json', ''));
}

function saveFlashcardSet(setName, flashcards) {
    const filePath = path.join(setsDirectory, `${setName}.json`);
    fs.writeFileSync(filePath, JSON.stringify(flashcards, null, 2));
}

function loadFlashcardSet(setName) {
    const filePath = path.join(setsDirectory, `${setName}.json`);
    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath));
    } else {
        return [];
    }
}

function displaySets() {
    const sets = loadSets();
    const setsList = document.getElementById('sets-list');
    setsList.innerHTML = '';
    sets.forEach(set => {
        const option = document.createElement('option');
        option.value = set;
        option.textContent = set;
        setsList.appendChild(option);
    });
}

function createFlashcardSet() {
    const setName = document.getElementById('set-name').value;
    if (!setName) {
        alert("Please enter a set name!");
        return;
    }

    const flashcards = [];
    saveFlashcardSet(setName, flashcards);

    document.getElementById('create-set-form').style.display = 'none';
    alert(`Flashcard set "${setName}" created!`);
}

function addFlashcardPair(setName) {
    const germanWord = document.getElementById('german-word').value;
    const englishWord = document.getElementById('english-word').value;

    if (!germanWord || !englishWord) {
        alert("Both fields must be filled!");
        return;
    }

    const flashcards = loadFlashcardSet(setName);
    flashcards.push([germanWord, englishWord]);
    saveFlashcardSet(setName, flashcards);

    document.getElementById('german-word').value = '';
    document.getElementById('english-word').value = '';
    alert("Flashcard added!");
}

function editFlashcard(setName) {
    const germanWord = document.getElementById('edit-german-word').value;
    const englishWord = document.getElementById('edit-english-word').value;

    if (!germanWord || !englishWord) {
        alert("Both fields must be filled!");
        return;
    }

    const flashcards = loadFlashcardSet(setName);
    const index = flashcards.findIndex(pair => pair[0] === germanWord);
    if (index === -1) {
        alert("Flashcard not found!");
        return;
    }

    flashcards[index] = [germanWord, englishWord];
    saveFlashcardSet(setName, flashcards);

    alert("Flashcard updated!");
}

function removeFlashcard(setName) {
    const germanWord = document.getElementById('edit-german-word').value;

    if (!germanWord) {
        alert("Please enter a German word to remove!");
        return;
    }

    const flashcards = loadFlashcardSet(setName);
    const index = flashcards.findIndex(pair => pair[0] === germanWord);
    if (index === -1) {
        alert("Flashcard not found!");
        return;
    }

    flashcards.splice(index, 1);
    saveFlashcardSet(setName, flashcards);

    alert("Flashcard removed!");
}

function startPlayingFlashcards(setName) {
    const flashcards = loadFlashcardSet(setName);
    if (flashcards.length === 0) {
        alert("This set is empty!");
        return;
    }

    let currentIndex = 0;
    let correctCount = 0;
    let totalCount = 0;
    let currentFlashcard = [];

    function showFlashcard() {
        if (currentIndex >= flashcards.length) {
            alert(`Game over! Correct: ${correctCount} / Total: ${flashcards.length}`);
            return;
        }

        currentFlashcard = flashcards[currentIndex];
        document.getElementById('flashcard-word').innerText = currentFlashcard[0]; // Show German word
        totalCount++;
        updateCounter();
    }

    function updateCounter() {
        document.getElementById('counter').innerText = `Correct: ${correctCount} / Total: ${totalCount}`;
    }

    showFlashcard();

    document.getElementById('flip').addEventListener('click', () => {
        document.getElementById('flashcard-word').innerText = currentFlashcard[1]; // Show English word
    });

    document.getElementById('correct').addEventListener('click', () => {
        correctCount++;
        currentIndex++;
        showFlashcard();
    });

    document.getElementById('next').addEventListener('click', () => {
        currentIndex++;
        showFlashcard();
    });
}

// Event listeners for buttons
document.getElementById('create-set').addEventListener('click', () => {
    document.getElementById('create-set-form').style.display = 'block';
    document.getElementById('edit-set-form').style.display = 'none';
    document.getElementById('flashcard-game').style.display = 'none';
});

document.getElementById('save-set').addEventListener('click', createFlashcardSet);

document.getElementById('edit-set').addEventListener('click', () => {
    document.getElementById('edit-set-form').style.display = 'block';
    document.getElementById('create-set-form').style.display = 'none';
    document.getElementById('flashcard-game').style.display = 'none';
    displaySets();
});

document.getElementById('load-set').addEventListener('click', () => {
    const setName = document.getElementById('sets-list').value;
    if (!setName) return;
    document.getElementById('edit-pairs').style.display = 'block';
    document.getElementById('create-set-form').style.display = 'none';
    document.getElementById('flashcard-game').style.display = 'none';
});

document.getElementById('add-flashcard').addEventListener('click', () => {
    const setName = document.getElementById('sets-list').value;
    addFlashcardPair(setName);
});

document.getElementById('edit-flashcard').addEventListener('click', () => {
    const setName = document.getElementById('sets-list').value;
    editFlashcard(setName);
});

document.getElementById('remove-flashcard').addEventListener('click', () => {
    const setName = document.getElementById('sets-list').value;
    removeFlashcard(setName);
});

document.getElementById('play-flashcards').addEventListener('click', () => {
    document.getElementById('flashcard-game').style.display = 'block';
    document.getElementById('create-set-form').style.display = 'none';
    document.getElementById('edit-set-form').style.display = 'none';

    const setName = prompt("Enter the name of the set you want to play:");
    if (setName) startPlayingFlashcards(setName);
});
