import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "../../img/money-bag.png";
import deagle from "../../img/deagle.png";
import { decode, encode } from "../helpers";

import "./Nav.scss";

import { configContext } from "../../App";
import { BACK_END_URL, POST_HEADER } from "../consts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faTimes } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
	const context = useContext(configContext);

	useEffect(() => {
		if (localStorage.token) {
			fetch(`${BACK_END_URL}/auth/checktoken`, {
				method: "POST",
				headers: POST_HEADER,
				body: JSON.stringify({ token: localStorage.token }),
			})
				.then((rawData) => rawData.json())
				.then((data) => {
					if (data.res === true) {
						context.setconfig({
							loggedIn: true,
							name: data.username,
							coins: data.coins,
						});
					}
				});
		} else {
			localStorage.removeItem("token");
		}
	}, []);
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
				<React.Fragment>
					<li className="link align-right coins-div logInName">
						<a href="/" onClick={(e) => e.preventDefault()}>
							{context.coins} <FontAwesomeIcon icon={faCoins} />
						</a>
					</li>
					<li className="link align-right">
						<Link to={`/Profile/${context.name}`} className="label">
							<b>{context.name}</b>
						</Link>
					</li>

					<li className="link align-right logout-btn">
						<a
							href="/"
							onClick={(e) => {
								localStorage.removeItem("token");
								context.setconfig({
									loggedIn: false,
									name: "",
									coins: null,
								});
							}}
							className="logout-a"
						>
							Logout <FontAwesomeIcon icon={faTimes} color="" />
						</a>
					</li>
				</React.Fragment>
			) : (
				<React.Fragment>
					<li className="link align-right login">
						<Link to="/LogIn" className="link">
							Log In
						</Link>
					</li>
					<li className="link align-right signin">
						<Link to="/SignIn" className="link">
							Sign In
						</Link>
					</li>
				</React.Fragment>
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
