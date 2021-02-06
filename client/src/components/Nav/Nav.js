import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";
import logo from "../../img/money-bag.png";

const Nav = () => {
	const [img1, setImg1] = useState("");
	/* const [img2, setImg2] = useState("") */

	useEffect(() => {
		import("../../img/deagle.png")
			.then((img) => setImg1(img.default))
			.catch((err) => console.error(err));
		/* import("./img/your-money-back-guaranteed.png").then(img => setImg2(img.default)).catch(err => console.error(err)) */
	}, []);

	return (
		<ul>
			<li data-label="logo">
				<Link to="/" className="link">
					<img src={logo} alt="logo" />
				</Link>
			</li>
			<li data-label="name">
				<Link to="/" className="site-name">
					Money on tha banks
				</Link>
			</li>
			<li data-label="tab-games">
				<Link to="/Games" className="link">
					Games
				</Link>
			</li>
			<li data-label="deagle">
				<Link to="/Profile/"> {/* link to miguel profile */}
					<img className="img1" src={img1} alt="pixa" />
				</Link>
			</li>
		</ul>
	);
};

export default Nav;
