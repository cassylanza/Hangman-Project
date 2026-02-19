"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = require("path");
const fs_1 = require("fs");
const path_2 = require("path");
const handler_1 = require("./handler");
const app = (0, express_1.default)();
const PORT = 5000;
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.get('/', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '../public/index.html'));
});
app.post("/guess", handler_1.hangmanHandler);
app.get('/guess', (req, res) => {
    (0, handler_1.hangmanHandler)(req, res);
});
app.post("/new-game", handler_1.startNewGameHandler);
app.get('/new-game', (req, res) => {
    (0, handler_1.startNewGameHandler)(req, res);
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map