# Hangman

A simple Hangman web application built with TypeScript, featuring an interactive frontend and an Express-based backend. Players guess letters to uncover a hidden word before running out of attempts.

---
## Table of Contents

- [Features](#features)
  - [Tracks](#tracks)  
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation-&-setup)   
- [Project Structure](#project-structure)  
- [How To Play](#how-to-play)
- [Development Notes](#development-notes)
- [Future Improvements](#future-improvements)  

---

## Features

- Random word selection from a word list
- Letter-by-letter guessing

### Tracks:

- Correct guesses
- Incorrect guesses
- Remaining attempts
- Displays guessed letters
- Win/Loss detection
- Backend-driven game state management
- TypeScript for both frontend and backend

---

## Tech Stack:

Frontend
- HTML
- CSS
- TypeScript
  
Backend
- Node.js
- Express
- TypeScript

---

## Project Structure
```
Hangman-Project/
│
├── frontend/        # Frontend client code
│
├── backend/         # Express server & game logic
│
├── common-7-letter-words.txt   # Word bank used for the game
│
├── package.json
└── README.md
```
---

## Installation & Setup
1. Clone the Repository
- git clone https://github.com/cassylanza/Hangman-Project.git
- cd Hangman-Project

2. Install Dependencies
- npm install

3. Run the Application
- npm start
- Then open: http://localhost:3000 (or whatever port is configured)

---

## How to Play
- A random word is selected.
- Guess one letter at a time.
- Correct guesses reveal letters in the word.
- Incorrect guesses reduce remaining attempts.
- Win by guessing the word before attempts run out.
- Lose if you exceed the maximum number of incorrect guesses.

---

## Development Notes
- Game state is managed server-side.
- Guessed letters are tracked using a Set<string>.
- Maximum incorrect attempts default to 6.
- Words are loaded from common-7-letter-words.txt.

---

## Future Improvements
- Add persistent user sessions
- Add difficulty levels
- Add score tracking
- Improve UI styling
- Deploy to DigitalOcean or similar hosting service
