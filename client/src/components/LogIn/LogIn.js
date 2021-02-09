import React, { useState, useContext, useEffect } from "react";

import { Link, Redirect } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUser,
	faLock,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./LogIn.scss";
import logo from "../../img/logo.png";

import { configContext } from "../../App";

import { AUTH_REQUISITES, BACK_END_URL, POST_HEADER } from "../consts";
import { hash, encode, makeid } from "../helpers";

import { useSnackbar } from "notistack";

const ERRORS = {
	username: {
		wrong: "Wrong Username",
		notexists: "Username does not exist",
		short: `Username len is always `,
	},
	password: {
		wrong: "Wrong Password",
	},
};

const LogIn = () => {
	const { loggedIn, setconfig } = useContext(configContext);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordLength, setPasswordLen] = useState(0);
	const [error, setError] = useState(false);

	const isAuthValidClientSide = () => {
		const usernameLen = username.length > AUTH_REQUISITES.username.len;
		const passwordLen = passwordLength > AUTH_REQUISITES.password.len;
		return [usernameLen, passwordLen].every((element) => element);
	};

	return !loggedIn ? (
		<div className="login-div">
			<img src={logo} alt="money-bag" className="logo" />
			<div className="mid-first-div">
				<div className="mid-div">
					<form className="form-LogIn">
						<div className="input user-div">
							<span>Username</span>
							<div className="input-part">
								<FontAwesomeIcon icon={faUser} />
								<input
									type="text"
									className={`input-username ${
										error && "error"
									}`}
									placeholder="Username"
									onChange={(e) => {
										setUsername(e.target.value);
									}}
								/>
							</div>
						</div>
						<div className="input">
							<span>Password</span>
							<div className="input-part">
								<FontAwesomeIcon icon={faLock} />
								<input
									type="password"
									className={`input-password ${
										error && "error"
									}`}
									placeholder="Password"
									onChange={(e) => {
										setPassword(hash(e.target.value));
										setPasswordLen(e.target.value);
									}}
								/>
							</div>
						</div>
					</form>
					<div className="btn-signin">
						<button>
							<Link to="/SignIn">Sign In</Link>
						</button>
					</div>
					<div className="btn-submit">
						<Link
							to="/Games"
							onClick={(e) => {
								e.preventDefault();
								const valid = isAuthValidClientSide();
								if (valid) {
									setError(false);
									const token = encode(makeid(128));
									fetch(`${BACK_END_URL}/auth/Checklogin`, {
										method: "POST",
										headers: POST_HEADER,
										body: JSON.stringify({
											password,
											username,
											token,
										}),
									})
										.then((rawData) => rawData.json())
										.then((data) => {
											
											if (!data) {
												setError(true);
												enqueueSnackbar(
													"Invalid credentials",
													{
														variant: "error",
													}
												);
											} else {
												console.log(data)
												setconfig({
													loggedIn: true,
													name: username,
													coins: data.coins,
												});
												localStorage.setItem(
													"token",
													token
												);
												enqueueSnackbar(
													"Successfully Logged In",
													{
														variant: "success",
													}
												);
											}
										});
								} else {
									enqueueSnackbar("Invalid credentials", {
										variant: "error",
									});
									setError(true);
								}
								[".input-username", ".input-password"].map(
									(selector) =>
										(document.querySelector(
											selector
										).value = "")
								);
							}}
						>
							Log In <FontAwesomeIcon icon={faChevronRight} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	) : (
		<Redirect to="/Games" />
	);
};

export default LogIn;
