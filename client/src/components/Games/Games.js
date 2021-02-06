import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
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
			<h3 className="headerName">Games Home</h3>
			<div className="display-divs">
				<Game label="Roulette" imgSrc="Roulette.jpg">
					<Link to="/Games/roulette">
						<button>
							<span>Play</span>
							<FontAwesomeIcon icon={faCoins} />
						</button>
					</Link>
				</Game>
				<Game label="BlackJack" imgSrc="BlackJack.png">
					<Link to="/Games/BlackJack">
						<button>
							<span>Play</span>
							<FontAwesomeIcon icon={faDice} />
						</button>
					</Link>
				</Game>
				<Game label="Crash" imgSrc="Crash.jpg">
					<Link to="/Games/Crash">
						<button>
							<span>Play</span>
							<FontAwesomeIcon icon={faChartLine} />
						</button>
					</Link>
				</Game>
				<Game label="JackPot" imgSrc="JackPot.jpg">
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
