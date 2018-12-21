const colyseus = require('colyseus');
const http = require('http');

const express = require('express');
const app = express();
const port = process.env.PORT || 3553;

const server = http.createServer(app);
const gameServer = new colyseus.Server({server: server});

gameServer.register("town", require("./rooms/town"));
server.listen(port);
