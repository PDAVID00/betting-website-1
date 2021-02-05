import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCoins, faDice, faChartLine, faBriefcase } from '@fortawesome/free-solid-svg-icons'

import "./Games.scss";

const Games = () => {
	return (
		<div className="Games">
			<h3 className="headerName">Games Home</h3>
			<Link to="/" className="btn-goBack">
				<button>
					<FontAwesomeIcon icon={faArrowLeft}/>
					Go back
				</button>
			</Link>
			<Link to="/Games/roulette">
				<button>
					Roulette
					<FontAwesomeIcon icon={faCoins}/>
				</button>
			</Link>
			<Link to="/Games/BlackJack">
				<button>
					BlackJack
					<FontAwesomeIcon icon={faDice}/>
				</button>
			</Link>
			<Link to="/Games/Crash">
				<button>
					Crash
					<FontAwesomeIcon icon={faChartLine}/>
				</button>
			</Link>
			<Link to="/Games/JackPot">
				<button>
					JackPot
					<FontAwesomeIcon icon={faBriefcase}/>
				</button>
			</Link>
		</div>
	);
};

export default Games;
