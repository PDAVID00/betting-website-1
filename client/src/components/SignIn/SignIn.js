import React, { useState, useContext } from "react";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
	faUser,
	faLock,
	faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import "./SignIn.scss";
import logo from "../../img/logo.png";

import { configContext } from "../../App";

import hash from "object-hash";
import { BACK_END_URL } from "../consts";

import { useSnackbar } from "notistack";

const SignIn = () => {
	/* const context = useContext(configContext); */
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
    const [email, setEmail] = useState("")

	return (
		<div className="signin-div">
			<img src={logo} alt="money-bag" className="logo" />
			<div className="mid-first-div">
				<div className="mid-div">
					<form className="form-LogIn">
						<div className="input">
							<span>Email</span>
							<div className="input-part">
								<FontAwesomeIcon icon={faEnvelope} />
								<input
									type="text"
									className="input-email"
									placeholder="Email"
									onChange={(e) => {
										setEmail(e.target.value);
									}}
								/>
							</div>
						</div>
						<div className="input user-div">
							<span>Username</span>
							<div className="input-part">
								<FontAwesomeIcon icon={faUser} />
								<input
									type="text"
									className="input-name"
									placeholder="Username"
									onChange={(e) => {
										setName(e.target.value);
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
									className="input-name"
									placeholder="Password"
									onChange={(e) => {
										setPassword(e.target.value);
									}}
								/>
							</div>
						</div>
					</form>
					<div className="btn-login">
						<button
							onClick={(e) => {
								console.log(name, password);
							}}
						>
							<Link to="/LogIn">Log In</Link>
						</button>
					</div>
					<div className="btn-sigin">
						<button onClick={(e) => {}}>
							Sign In <FontAwesomeIcon icon={faChevronRight} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
