import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import { io } from "socket.io-client";
import { BACK_END_URL } from "../consts";

import { configContext } from "../../App";
import "./Roulette.scss";

const Roulette = () => {
	const [game, setGame] = useState({});
	const context = useContext(configContext);
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
	return context.loggedIn ? (
		<div className="roulette">
			Roulette Num -> {game.num}
			<br />
			color -> {game.color}
		</div>
	) : (
		<Redirect to="/LogIn" />
	);
};

export default Roulette;
