import React, { useState, useEffect, useContext, useRef, useMemo } from "react";
import { Redirect } from "react-router-dom";

import { io } from "socket.io-client";
import { BACK_END_URL, POST_HEADER } from "../consts";

import "./Jackpot.scss";
import { configContext } from "../../App";
import { useSnackbar } from "notistack";

const isNumber = (s) => /^[0-9]+(\.)?[0-9]*$/.test(s);

const JackPot = () => {
	const { setconfig, loggedIn, name, coins, id } = useContext(configContext);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [clock_time, setclock_time] = useState(10);
	const [bets, setBets] = useState([]);
	const [bet, setBet] = useState(0);
	const [betsAmount, setbetsAmount] = useState(0);
	const [gameState, setGameState] = useState("");
	const socket = useMemo(() => io(BACK_END_URL), []);

	const setStateWithData = (res) => {
		const data = res.data;
		const objkeys = Object.keys(data);
		if (objkeys.length >= 1) {
			console.log("here");
			setBets(objkeys.map((bet) => data[bet]));
			setbetsAmount((betsAmount) =>
				objkeys.reduce((sum, bet) => sum + data[bet].betAmount, 0)
			);
			setGameState(res.state);
		}
		setclock_time((clock_time) => (res.timer ? res.timer : clock_time));
	};

	useEffect(() => {
		let interval;
		socket.on("jackpot", (data) => {
			console.log("started jackpot clock");
			interval = setInterval(function () {
				setclock_time((clock_time) => {
					console.log(clock_time);
					if (clock_time <= 0) {
						return 0;
					} else {
						return Number((clock_time - 0.1).toFixed(1));
					}
				});
			}, 100);
			setStateWithData(data);
		});
		socket.on("jackpot-UpdateBets", (data) => {
			setStateWithData({ data });
		});
		socket.on("jackpot-winner", (data) => {
			console.log("winner -> ", data);
			if (socket.id === data.winner) {
				enqueueSnackbar(
					`Congratulations! You just won ${data.amount}!`,
					{ variant: "success" }
				);
			} else if (bet > 0) {
				enqueueSnackbar(`Good luck next time!`, { variant: "error" });
			}
			setBets([]);
			setBet(0);
			setclock_time(7);
			setbetsAmount(0);
		});
		socket.on("jackpot-startTimer", () => {
			setclock_time(30);
		});
		socket.on("jackpot-newBet-result", ({ coins }) => {
			setBet(coins);
		});
		socket.on("hacker?", () => {
			enqueueSnackbar(`U tried, next time ur account will get del`, {
				variant: "error",
			});
		});
		socket.emit("jackpot-join", { name, coins, id });
		console.log("clock-time -> ", clock_time);
		return () => {
			socket.disconnect();
			interval && clearInterval(interval);
		};
	}, []);

	return loggedIn ? (
		<div className="Jackpot">
			<h1>Jackpot</h1>
			<div className="chat">chat</div>

			<div className="game">
				<span className="timer-label">
					{clock_time === 0 ? "Waiting for players!" : clock_time}
				</span>
				<div className="bet-controller">
					<input
						type="number"
						className="input-bet"
						placeholder={"Bet amount"}
					/>
					<button
						onClick={(e) => {
							setclock_time((time) => time);
							const el = document.querySelector(".input-bet");
							const val = parseFloat(
								el.value.replace("e", "").replace("E", "")
							);
							if (isNumber(val)) {
								if (coins >= val) {
									socket.emit("jackpot-newBet", {
										name,
										id,
										betCoins: val,
									});
									setBet((bet) => bet + val);
								} else {
									enqueueSnackbar("Not enough coins!", {
										variant: "error",
									});
								}
							} else {
								enqueueSnackbar("Invalid bet amount!", {
									variant: "error",
								});
							}
							el.value = "";
						}}
					>
						BET
					</button>
					<h4 className="bet-amount">{bet}$</h4>
					<h3 className="all-bet-amount">
						Room amount -> {betsAmount}$
					</h3>
				</div>
			</div>

			<div className="bets">
				{bets.map((bet, i) => (
					<div className="bet" key={i}>
						<span className="name">{bet.name}</span>
						<span className="betAmount">
							Bet -> {bet.betAmount}$ -- {bet.chance * 100}%
						</span>
					</div>
				))}
			</div>
		</div>
	) : (
		<Redirect to="/LogIn" />
	);
};

export default JackPot;
