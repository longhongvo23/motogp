const http = require("http");
const express = require("express");

const hostname = 'localhost'; // localhost
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text-plain');
    res.end('Hello Long');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

