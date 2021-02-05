import React from "react";

const Game = (props) => {
	return (
		<div class="card">
			<img src={props.imgSrc} alt="Avatar" />
			<div class="container">
				<h4>
					<b>{props.label}</b>
				</h4>
				<p>{props.label}</p>
			</div>
		</div>
	);
};

export default Game;
