"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Routes_1 = require("./Backend/Routes/Routes"); // Ensure the path is correct
var dbconnect_1 = require("./Backend/Config/dbconnect");
var app = (0, express_1.default)();
var port = 3000;
(0, dbconnect_1.default)();
app.use(cors());
app.use(express_1.default.json());
app.use('/api', Routes_1.default);
app.get('/', function (req, res) {
    res.send('Hello, TypeScript with Express!');
});
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
function cors() {
    throw new Error('Function not implemented.');
}
