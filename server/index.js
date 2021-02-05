const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*" } });

const rouletteFun = () => {
	const num = Math.round(Math.random() * 10);
	const colorNum = Math.random();
	const color = colorNum > 0.5 ? "black" : "red";
	const newData = { num, color };
	Games.jackpot = newData;
	io.emit("roulette", newData);
};

let Games = {
	blackjack: {},
	crash: {},
	roulette: {},
	jackpot: {},
};

app.use(router);

io.on("connection", (socket) => {
	console.log("New connection received!");
	socket.on("disconnect", () => {
		console.log("User left!");
	});
	socket.on("roulette-join", (data) => {
		console.log("new roulette-join: ", data.name);
	});
});

/* Roulette */
rouletteFun();
setInterval(() => {
	rouletteFun();
}, 2 * 1000 /* 30 secs */);

server.listen(PORT, () =>
	console.log(`Server is now listening on localhost:${PORT}`)
);

module.exports = Games;
