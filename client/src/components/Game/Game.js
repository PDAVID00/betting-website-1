import React, { useState, useEffect } from "react";

import "./Game.scss"

const Game = (props) => {
	const [image, setImage] = useState("");

	useEffect(() => {
		import(`../../img/Games/${props.imgSrc}`).then((img) => {
			setImage(img.default);
		});
	}, []);
	return (
		<div className="card">
			<img
				src={image}
				alt="Avatar"
			/>
			<div className="container">
				<h4>
					<b>{props.label}</b>
				</h4>
				<p>{props.children}</p>
			</div>
		</div>
	);
};

export default Game;
