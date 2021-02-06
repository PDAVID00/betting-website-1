import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";
import logo from "../../img/money-bag.png";
import deagle from "../../img/deagle.png";

const Nav = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [name, setname] = useState("Name");

	return (
		<ul className="nav-bar">
			<li className="logo">
				<Link to="/">
					<img src={logo} alt="logo" />
				</Link>
			</li>
			<li className="name">
				<Link to="/" className="site-name">
					Money on tha banks
				</Link>
			</li>
			<li className="link Games-link">
				<Link to="/Games" className="link">
					Games
				</Link>
			</li>
			{loggedIn ? (
				<li className="align-right logInName">
					<Link to={`/Profile/${name}`} className="label">
						<b>{name}</b>
					</Link>
				</li>
			) : (
				[
					<li className="link align-right login" key="1">
						<Link to="/LogIn" className="link">
							LogIn
						</Link>
					</li>,
					<li className="link align-right signin" key="2">
						<Link to="/SignIn" className="link">
							SignIn
						</Link>
					</li>,
				].map((listItem) => listItem)
			)}
			<li className="most-right">
				<Link to="/Profile/">
					{/* link to miguel profile */}
					<img
						className="img1"
						src={deagle}
						alt="deagle do miguel gay"
					/>
				</Link>
			</li>
		</ul>
	);
};

export default Nav;
