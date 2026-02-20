"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const handler_1 = require("./handler");
const app = (0, express_1.default)();
const PORT = 3001;
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "../frontend")));
app.get('/', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '../frontend/index.html'));
});
//app.post("/guess", hangmanHandler);
app.post('/guess', (req, res) => {
    (0, handler_1.hangmanHandler)(req, res);
});
//app.post("/new-game", startNewGameHandler);
app.post('/new-game', (req, res) => {
    (0, handler_1.startNewGameHandler)(req, res);
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
