import React, { useState, useEffect, useContext } from "react";
import {Redirect} from "react-router-dom"

import { io } from "socket.io-client";
import { BACK_END_URL } from "../consts";

import "./Jackpot.scss"
import { configContext } from "../../App";
const JackPot = () => {
	const context = useContext(configContext);
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
    return context.loggedIn ? (
        <div>
            BlackJack
        </div>
    ) : <Redirect to="/LogIn"/>
};

export default JackPot;
