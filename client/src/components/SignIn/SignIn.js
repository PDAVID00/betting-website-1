import React, { useState, useContext, useEffect } from "react";

import { Link, Redirect } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEnvelope,
	faUser,
	faLock,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./SignIn.scss";
import logo from "../../img/logo.png";

import { configContext } from "../../App";

import { encode, hash, makeid } from "../helpers";
import { AUTH_REQUISITES, BACK_END_URL, POST_HEADER } from "../consts";

import { useSnackbar } from "notistack";

const ERRORS = {
	email: {
		short: "Email too short!",
		inUse: "Email already in use!",
		format: "Email wrong format!",
	},
	username: {
		short: "Username too short!",
		inUse: "Username already in use!",
	},
	password: { short: "Password too short!" },
};

const SignIn = () => {
	const { setconfig, loggedIn } = useContext(configContext);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [username, setName] = useState("");
	const [password, setPassword] = useState("");
	const [passwordLength, setPasswordLen] = useState(0);
	const [email, setEmail] = useState("");
	const [error, setError] = useState({});

	const isAuthValidClientSide = () => {
		const emailFormat = AUTH_REQUISITES.email.has.every((element) =>
			email.includes(element)
		);
		const emailLen = email.length > AUTH_REQUISITES.email.len;
		const usernameLen = username.length > AUTH_REQUISITES.username.len;
		const passwordLen = passwordLength > AUTH_REQUISITES.password.len;
		if (!emailFormat) {
			setError({ err: "email", type: "format" });
			document.querySelector(".input-email").value = "";
		} else if (!emailLen) {
			setError({ err: "email", type: "short" });
			document.querySelector(".input-email").value = "";
		} else if (!usernameLen) {
			setError({ err: "username", type: "short" });
			document.querySelector(".input-username").value = "";
		} else if (!passwordLen) {
			setError({ err: "password", type: "short" });
			document.querySelector(".input-password").value = "";
		}

		return [emailFormat, emailLen, usernameLen, passwordLen].every(
			(element) => element
		);
	};

	return !loggedIn ? (
		<div className="signin-div">
			<img src={logo} alt="money-bag" className="logo" />
			<div className="mid-first-div">
				<div className="mid-div">
					<form className="form-LogIn">
						<div className="input">
							<span>Email</span>
							{error.err === "email" && (
								<span className="error">
									{ERRORS.email[error.type]}
								</span>
							)}
							<div className="input-part">
								<FontAwesomeIcon icon={faEnvelope} />
								<input
									type="text"
									className={`input-email ${
										error.err === "email" && "error"
									}`}
									placeholder="Email"
									onChange={(e) => {
										setEmail(e.target.value);
									}}
								/>
							</div>
						</div>
						<div className="input user-div">
							<span>Username</span>
							{error.err === "username" && (
								<span className="error">
									{ERRORS.username[error.type]}
								</span>
							)}
							<div className="input-part">
								<FontAwesomeIcon icon={faUser} />
								<input
									type="text"
									className={`input-name input-username ${
										error.err === "username" && "error"
									}`}
									placeholder="Username"
									onChange={(e) => {
										setName(e.target.value);
									}}
								/>
							</div>
						</div>
						<div className="input">
							<span>Password</span>
							{error.err === "password" && (
								<span className="error">
									{ERRORS.password[error.type]}
								</span>
							)}
							<div className="input-part">
								<FontAwesomeIcon icon={faLock} />
								<input
									type="password"
									className={`input-name input-password ${
										error.err === "password" && "error"
									}`}
									placeholder="Password"
									onChange={(e) => {
										setPassword(hash(e.target.value));
										setPasswordLen(e.target.value.length);
									}}
								/>
							</div>
						</div>
					</form>
					<div className="btn-login">
						<button>
							<Link to="/LogIn">Log In</Link>
						</button>
					</div>
					<div className="btn-sigin">
						<Link
							to="/"
							onClick={(e) => {
								e.preventDefault();
								const isValid = isAuthValidClientSide();
								if (isValid) {
									const token = encode(makeid(128));
									setError({});
									fetch(`${BACK_END_URL}/auth/newUser`, {
										method: "POST",
										headers: POST_HEADER,
										body: JSON.stringify({
											password,
											username,
											email,
											token,
										}),
									})
										.then((rawData) => rawData.json())
										.then((data) => {
											if (data.status !== 200) {
												e.preventDefault();
												setError({
													err: data.err,
													type: "inUse",
												});
												document.querySelector(
													`.input-${data.err}`
												).value = "";
											} else {
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
												enqueueSnackbar(
													"Have fun playing!",
													{ variant: "info" }
												);
												setconfig({
													loggedIn: true,
													name: username,
													coins: data.coins,
													id: data.id,
												});
											}
										});
								}
							}}
						>
							Sign In <FontAwesomeIcon icon={faChevronRight} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	) : (
		<Redirect to="/" />
	);
};

export default SignIn;
