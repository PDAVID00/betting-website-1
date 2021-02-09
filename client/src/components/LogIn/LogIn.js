import React, { useState, useContext } from "react";

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

import { BACK_END_URL, POST_HEADER } from "../consts";
import { hash, encode, makeid } from "../helpers";

import { useSnackbar } from "notistack";

const ERRORS = {
	username: {
		wrong: "Wrong Username",
		notexists: "Username does not exist",
	},
	password: {
		wrong: "Wrong Password",
	},
};

const LogIn = () => {
	const context = useContext(configContext);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState({});

	
	return !context.loggedIn ? (
		<div className="login-div">
			<img src={logo} alt="money-bag" className="logo" />
			<div className="mid-first-div">
				<div className="mid-div">
					<form className="form-LogIn">
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
									className="input-username"
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
									className="input-password"
									placeholder="Password"
									onChange={(e) => {
										setPassword(hash(e.target.value));
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
								const token = encode(makeid(128));
								setError({});
								fetch(`${BACK_END_URL}/auth/Checklogin`, {
									method: "POST",
									headers: POST_HEADER,
									body: JSON.stringify({
										password,
										username,
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
										} else {
											localStorage.setItem(
												"token",
												token
											);
											fetch(
												`${BACK_END_URL}/auth/setToken`,
												{
													method: "POST",
													headers: POST_HEADER,
													body: { token, username },
												}
											);
											enqueueSnackbar(
												"Successfully Logged In",
												{
													variant: "success",
												}
											);
											context.setconfig({
												name: username,
												loggedIn: true,
											});
										}
									});
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
