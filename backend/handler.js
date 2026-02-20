"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hangmanHandler = exports.startNewGameHandler = void 0;
const express_1 = require("express");
const fs_1 = require("fs");
const path_1 = require("path");
const url_1 = require("url");
const path_2 = require("path");
const fs_2 = require("fs");
let wordList = [];
let word = "";
let guessedLetters = new Set();
let incorrectGuesses = 0;
const maxAttempts = 6;
const filePath = path_1.default.join(__dirname, "../wordlist.txt");
wordList = fs_1.default.readFileSync(filePath, "utf-8")
    .split("\n")
    .map((w) => w.trim().toLowerCase())
    .filter((w) => w.length >= 7);
function generateWord() {
    return wordList[Math.floor(Math.random() * wordList.length)];
}
const startNewGameHandler = (_req, res) => {
    word = generateWord();
    guessedLetters = new Set();
    incorrectGuesses = 0;
    res.json({ message: "New game started", wordLength: word.length });
};
exports.startNewGameHandler = startNewGameHandler;
const hangmanHandler = (req, res) => {
    const parsedUrl = (0, url_1.parse)(req.url, true);
    const imageName = parsedUrl.query.image || "image1.jpeg"; // Default image
    const imagePath = (0, path_2.join)(__dirname, "../public/images", imageName); // Navigate out of `src/`
    (0, fs_2.readFile)(imagePath, (err, data) => {
        if (err) {
            console.error(`Error: ${err.message}`);
            res.statusCode = 404;
            res.end("Image not found");
        }
        else {
            res.setHeader("Content-Type", "image/jpeg");
            res.end(data, () => console.log("File sent"));
        }
    });
    const { letter } = req.body;
    if (!letter || typeof letter !== "string" || letter.length !== 1) {
        return res.status(400).json({ error: "Invalid letter." });
    }
    letter.toLowerCase();
    guessedLetters.add(letter);
    if (!word.includes(letter)) {
        incorrectGuesses++;
    }
    const displayWord = word
        .split("")
        .map((l) => (guessedLetters.has(l) ? l : "_"))
        .join("");
    const gameOver = incorrectGuesses >= maxAttempts || !displayWord.includes("_");
    const win = !displayWord.includes("_");
    const responseData = {
        displayWord,
        incorrectGuesses,
        remainingAttempts: maxAttempts - incorrectGuesses,
        gameOver,
        win,
    };
    if (gameOver && !win) {
        responseData.word = word;
    }
    res.json(responseData);
};
exports.hangmanHandler = hangmanHandler;
//# sourceMappingURL=handler.js.map