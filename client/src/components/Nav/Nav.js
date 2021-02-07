import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import logo from "../../img/money-bag.png";
import deagle from "../../img/deagle.png";

import "./Nav.scss";

import { configContext } from "../../App";

const Nav = () => {
	const context = useContext(configContext);
	console.log("context ", context);

	return (
		<ul className="nav-bar">
			<li className="logo">
				<Link to="/">
					<img src={logo} alt="logo" />
				</Link>
			</li>
			<li className="link Games-link">
				<Link to="/Games" className="link">
					Games
				</Link>
			</li>
			{context.loggedIn ? (
				<li className="align-right logInName">
					<Link to={`/Profile/${context.name}`} className="label">
						<b>{context.name}</b>
					</Link>
				</li>
			) : (
				[
					<li className="link align-right login" key="1">
						<Link to="/LogIn" className="link">
							Log In
						</Link>
					</li>,
					<li className="link align-right signin" key="2">
						<Link to="/SignIn" className="link">
							Sign In
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
