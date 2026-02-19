console.log(`Handler file loaded`);

import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { join } from "path";
import { readFile } from "fs";

// Game state variables
let wordList: string[] = [];
let word = "";
let guessedLetters = new Set<string>();
let incorrectGuesses = 0;
const maxAttempts = 6;

// Load word list from file
const filePath = "/Users/cassandralanza/Hangman Project/common-7-letter-words.txt";
wordList = fs.readFileSync(filePath, "utf-8")
	.split("\n")
	.map((w) => w.trim().toLowerCase());

// Function to select a random word from the list
function generateWord() {
	return wordList[Math.floor(Math.random() * wordList.length)];
}

// Handler to start a new game
export const startNewGameHandler = (_req: Request, res: Response) => {
  console.log(`Handler file loaded`);

	word = generateWord();
	guessedLetters = new Set<string>();
	incorrectGuesses = 0;
	res.json({ message: "New game started", wordLength: word.length });
};

// Handler to process a guess
export const hangmanHandler = (req: Request, res: Response) => {
    
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

  const responseData: any = {
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





