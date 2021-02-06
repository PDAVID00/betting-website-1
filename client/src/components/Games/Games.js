import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCoins,
	faDice,
	faChartLine,
	faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

import Game from "../Game/Game";
import "./Games.scss";


const Games = () => {
	return (
		<div className="Games">
			<h2 className="headerName">Games Home</h2>
			<div className="display-divs">
				<Game label="Roulette" imgSrc="Roulette">
					<Link to="/Games/roulette">
						<button>
							<span>Play</span>
							<FontAwesomeIcon icon={faCoins} />
						</button>
					</Link>
				</Game>
				<Game label="BlackJack" imgSrc="BlackJack">
					<Link to="/Games/BlackJack">
						<button>
							<span>Play</span>
							<FontAwesomeIcon icon={faDice} />
						</button>
					</Link>
				</Game>
				<Game label="Crash" imgSrc="Crash">
					<Link to="/Games/Crash">
						<button>
							<span>Play</span>
							<FontAwesomeIcon icon={faChartLine} />
						</button>
					</Link>
				</Game>
				<Game label="JackPot" imgSrc="JackPot">
					<Link to="/Games/JackPot">
						<button>
							<span>Play</span>
							<FontAwesomeIcon icon={faBriefcase} />
						</button>
					</Link>
				</Game>
			</div>
		</div>
	);
};

export default Games;
