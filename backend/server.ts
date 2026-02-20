import express from "express";
import path from "path";
import { readFile } from "fs";
import { join } from "path";
import { hangmanHandler, startNewGameHandler } from "./handler";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

//app.post("/guess", hangmanHandler);
app.post('/guess', (req, res) => {
	hangmanHandler(req, res);
});

//app.post("/new-game", startNewGameHandler);
app.post('/new-game', (req, res) => {
	startNewGameHandler(req, res);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
