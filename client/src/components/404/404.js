import React from "react";
import { Link } from "react-router-dom";

import sadPeepo from "../../img/sadpeepo.jpg";

import "./404.scss";

const notFound404 = () => {
	return (
		<div className="notFound404">
			<div className="content">
				<h1>
					<b className="red">404</b> Not Found
				</h1>
				<img src={sadPeepo} alt="sadPeepo"/>
				<Link to="/Games">
					<button>Go to Home page</button>
				</Link>
			</div>
		</div>
	);
};

export default notFound404;
