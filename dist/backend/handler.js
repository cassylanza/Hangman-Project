"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hangmanHandler = exports.startNewGameHandler = void 0;
console.log(`Handler file loaded`);
const fs_1 = __importDefault(require("fs"));
// Game state variables
let wordList = [];
let word = "";
let guessedLetters = new Set();
let incorrectGuesses = 0;
const maxAttempts = 6;
// Load word list from file
const filePath = "/Users/cassandralanza/Hangman Project/common-7-letter-words.txt";
wordList = fs_1.default.readFileSync(filePath, "utf-8")
    .split("\n")
    .map((w) => w.trim().toLowerCase());
// Function to select a random word from the list
function generateWord() {
    return wordList[Math.floor(Math.random() * wordList.length)];
}
// Handler to start a new game
const startNewGameHandler = (_req, res) => {
    console.log(`Handler file loaded`);
    word = generateWord();
    guessedLetters = new Set();
    incorrectGuesses = 0;
    res.json({ message: "New game started", wordLength: word.length });
};
exports.startNewGameHandler = startNewGameHandler;
// Handler to process a guess
const hangmanHandler = (req, res) => {
    const { letter } = req.body;
    console.log(`Received guess: ${letter}`);
    const submittedLetter = letter.toLowerCase();
    guessedLetters.add(submittedLetter);
    if (!word.includes(submittedLetter)) {
        incorrectGuesses++;
    }
    const displayWord = word
        .split("")
        .map((l) => (guessedLetters.has(l) ? l : "_"))
        .join("");
    const allLettersGuessed = word
        .split("")
        .every((l) => guessedLetters.has(l));
    const win = allLettersGuessed;
    const gameOver = incorrectGuesses >= maxAttempts || win;
    const responseData = {
        displayWord,
        word,
        incorrectGuesses,
        lettersGuessed: Array.from(guessedLetters),
        remainingAttempts: maxAttempts - incorrectGuesses,
        gameOver,
        win,
        image: incorrectGuesses
    };
    if (gameOver && !win) {
        responseData.word = word;
    }
    res.json(responseData);
};
exports.hangmanHandler = hangmanHandler;
