import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { BACK_END_URL } from "../consts";

import "./Roulette.scss";

const Roulette = () => {
	const [game, setGame] = useState({});

	useEffect(() => {
		const socket = io(BACK_END_URL);
		socket.on("roulette", (message) => {
			console.log("new data: ", message);
			setGame(message);
		});
		socket.emit("roulette-join", {});

		return () => {
			socket.disconnect();
		};
	}, []);
	return (
		<div className="roulette">
			Roulette Num -> {game.num}
			<br />
			color -> {game.color}
		</div>
	);
};

export default Roulette;
