import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";
import logo from "../../img/money-bag.png";

const Nav = () => {
	return (
		<ul>
			<li>
				<Link to="/" className="link">
					<span className="material-icons">attach_money</span>
				</Link>
			</li>
			<li>
				<Link to="/" className="site-name">
					Money on tha banks
				</Link>
			</li>
			<li>
				<Link to="/Games" className="link">
					Games
				</Link>
			</li>
		</ul>
	);
};

export default Nav;
