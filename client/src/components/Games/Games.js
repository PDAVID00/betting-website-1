import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCoins,
	faDice,
	faChartLine,
	faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

import GameCard from "../GameCard/GameCard";
import "./Games.scss";

const Games = () => {
	return (
		<div className="Games">
			<h2 className="headerName">Games Home</h2>
			<div className="display-divs">
				<GameCard label="Roulette" imgSrc="Roulette">
					<Link to="/Games/roulette">
						<button>
							<span>Play</span>
							<FontAwesomeIcon icon={faCoins} />
						</button>
					</Link>
				</GameCard>
				<GameCard label="BlackJack" imgSrc="BlackJack">
					<Link to="/Games/BlackJack">
						<button>
							<span>Play</span>
							<FontAwesomeIcon icon={faDice} />
						</button>
					</Link>
				</GameCard>
				<GameCard label="Crash" imgSrc="Crash">
					<Link to="/Games/Crash">
						<button>
							<span>Play</span>
							<FontAwesomeIcon icon={faChartLine} />
						</button>
					</Link>
				</GameCard>
				<GameCard label="JackPot" imgSrc="JackPot">
					<Link to="/Games/JackPot">
						<button>
							<span>Play</span>
							<FontAwesomeIcon icon={faBriefcase} />
						</button>
					</Link>
				</GameCard>
			</div>
		</div>
	);
};

export default Games;
