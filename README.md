# Flashcard App
## this is a ROUGH W.I.P

A simple and intuitive flashcard app designed to help you learn and memorize anything, from vocabulary to concepts. Built with Electron.js, this app allows you to create, edit, and play flashcard sets with ease.

---

## Features

- **Create Flashcard Sets**: Easily create new sets of flashcards.
- **Edit Flashcards**: Add, update, or delete flashcards in any set.
- **Play Flashcards**: Study your flashcards in three modes: Shuffle, Forward, and Backward.
- **Responsive Design**: Clean and modern interface with the Roboto font for better readability.
- **Cross-Platform**: Works on Windows, macOS, and Linux.

---

## Installation

### Prerequisites
- Node.js
- Electron

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/flashcard-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd flashcard-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the app:
   ```bash
   npm start
   ```

---

## Usage

### Creating a Flashcard Set
1. Click **Create Set** on the main screen.
2. Enter a name for your set and click **Create**.
3. You will be redirected to the **Edit** page to add flashcards.

### Editing a Flashcard Set
1. Select a set from the dropdown menu.
2. Add, update, or delete flashcards as needed.
3. Click **Save Set** to save your changes.

### Playing Flashcards
1. Click **Play** on the main screen.
2. Select a set and choose a direction (Shuffle, Forward, or Backward).
3. Use the **Flip Card** button to reveal the answer and the **Next** button to move to the next card.
4. Click **Exit Set** to return to the main screen.

---

## Project Structure

```
flashcard-app/
├── index.html              
├── main.js                 
├── styles.css              
├── pages/                  
│   ├── create.html         
│   ├── create.js          
│   ├── edit.html           
│   ├── edit.js            
│   ├── play.html           
│   ├── play.js             
│   └── renderer.js         
└── sets/                   
    └── german.json         
```
