const path = require("path");
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
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
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
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

let connectedUsers = { jackpot: {} };
let bets = { jackpot: {} };
let timers = { jackpot: 15 };
io.on("connection", (socket) => {
	console.log("New connection received!");
	socket.on("disconnect", () => {
		if (
			connectedUsers.jackpot[socket.id] &&
			connectedUsers.jackpot[socket.id] !== {}
		) {
			console.log(
				`User ${connectedUsers.jackpot[socket.id].name} disconnected!`
			);
			delete connectedUsers.jackpot[socket.id];
		}
	});
	socket.on("roulette-join", (data) => {
		console.log("new roulette-join: ", data.name);
	});
	socket.on("jackpot-join", (data) => {
		connectedUsers.jackpot[socket.id] = {
			name: data.name,
			id: socket.id,
			socket,
		};
		console.log(connectedUsers);
		console.log(`${data.name} logged in jackpot`);
		console.log(data);
		socket.emit("jackpot", { data: bets.jackpot, timer: timers.jackpot });
	});
	socket.on("jackpot-newBet", (data) => {
		console.log("jackpot-UpdateBets", data);
		if (bets.jackpot[socket.id] && bets.jackpot[socket.id] !== {}) {
			bets.jackpot[socket.id].betAmount += parseInt(data.betAmount);
		} else {
			bets.jackpot[socket.id] = {
				name: data.name,
				betAmount: parseInt(data.betAmount),
			};
		}
		console.log(bets.jackpot);
		io.emit("jackpot-UpdateBets", bets.jackpot);
	});
});
let jackpotWinnerAnnounced = false;
setInterval(() => {
	if (timers.jackpot < 0) {
		if (!jackpotWinnerAnnounced) {
			const random = Math.floor(
				Math.random() * Object.keys(bets.jackpot).length
			);
			const winnerBet = Object.keys(bets.jackpot).reduce((acc, e) => {
				return acc + bets.jackpot[e].betAmount;
			}, 0);
			try {
				io.emit("jackpot-winner", {
					winner:
						connectedUsers.jackpot[
							Object.keys(bets.jackpot)[random]
						].id,
					amount: winnerBet,
				});
			} catch (error) {
				io.emit("jackpot-winner", { winner: null });
			}
			jackpotWinnerAnnounced = true;
		}
		if (timers.jackpot === -7) {
			jackpotWinnerAnnounced = false;
			bets.jackpot = {};

			timers.jackpot = 30;
			io.emit("jackpot-startTimer");
		}
	}
	timers.jackpot = Number((timers.jackpot - 0.1).toFixed(1));
}, 100);

/* Roulette 
rouletteFun();
setInterval(() => {
	rouletteFun();
}, 30 * 1000 30 secs );
*/

server.listen(PORT, () =>
	console.log(`Server is now listening on localhost:${PORT}`)
);

module.exports = Games;
