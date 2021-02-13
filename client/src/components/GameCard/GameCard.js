import React from "react";

import "./GameCard.scss";

import Roulette from "../../img/Games/Roulette.jpg";
import BlackJack from "../../img/Games/BlackJack.png";
import Crash from "../../img/Games/Crash.jpg";
import JackPot from "../../img/Games/JackPot.jpg";

const Imgs = {
	Roulette,
	BlackJack,
	Crash,
	JackPot,
};

const GameCard = (props) => {
	return (
		<div className="card">
			<img src={Imgs[props.imgSrc]} alt="Avatar" />
			<div className="container">
				<h4>
					<b>{props.label}</b>
				</h4>
				<p>{props.children}</p>
			</div>
		</div>
	);
};

export default GameCard;
