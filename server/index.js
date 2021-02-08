const path = require("path");
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const PORT = process.env.PORT || 80;

const router = require("./router");

const app = express();
app.use(cors());
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
app.use(express.static("public"));
app.use(router);
app.use(function (req, res, next) {
	const options = {
		root: path.join(__dirname, "public"),
		dotfiles: "deny",
		headers: {
			"x-timestamp": Date.now(),
			"x-sent": true,
		},
	};
	res.status(404).sendFile("./404.html", options, console.error);
});

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
}, 30 * 1000 /* 30 secs */);

server.listen(PORT, () =>
	console.log(`Server is now listening on localhost:${PORT}`)
);

module.exports = Games;
