import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { BACK_END_URL } from "../consts";

import "./Jackpot.scss"

const JackPot = () => {
	const [game, setGame] = useState({});

	useEffect(() => {
		const socket = io(BACK_END_URL);
		socket.on("jackpot", (message) => {
			console.log("new data: ", message);
			setGame(message);
		});
		socket.emit("jackpot-join", {});

		return () => {
			socket.disconnect();
		};
	}, []);
	return (
		<div className="jackpot">
			Jackpot Num -> {game.num}
			color -> {game.color}
		</div>
	);
};

export default JackPot;
