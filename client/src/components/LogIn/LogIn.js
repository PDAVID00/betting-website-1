import React, { useState, useContext } from "react";
import "./LogIn.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUser,
	faLock,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { configContext } from "../../App";

import logo from "../../img/logo.png";

const LogIn = () => {
	const context = useContext(configContext);
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className="login-div">
			<img src={logo} alt="money-bag" className="logo" />
			<div className="mid-first-div">
				<div className="mid-div">
					<form className="form-LogIn">
						{/* <h3>CSGO Lurk</h3> */}

						<div className="input user-div">
							<span>Username</span>
							<div className="input-part">
								<FontAwesomeIcon icon={faUser} />
								<input
									type="text"
									className="input-name"
									placeholder="Username"
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
								/>
							</div>
						</div>
					</form>
					<div className="btn-submit">
						<button>
							Send <FontAwesomeIcon icon={faChevronRight} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LogIn;
