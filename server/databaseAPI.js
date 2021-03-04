const sqlite3 = require("sqlite3");
const { getDateNow, decode } = require("./helper");

const DB_PATH = "./public/database.db";
const DB_NAME = "Users";
const DB_PARAMS = `(
	password,
	email,
	username,
	display_name,
	coins
)`;
const DB_GAME_SCHEMA = `(
    bet integer NOT NULL,
    done_on TEXT DEFAULT '${getDateNow()}',
    profit integer NOT NULL DEFAULT (0),
    user_id integer NOT NULL,
        FOREIGN KEY (user_id) REFERENCES ${DB_NAME}(id)
)`;
const DB = new sqlite3.Database(DB_PATH, (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log("Connected to db");
});
DB.get("PRAGMA foreign_keys = ON");
DB.run(
	`CREATE TABLE IF NOT EXISTS ${DB_NAME} (
        id integer NOT NULL PRIMARY KEY,
        email text NOT NULL UNIQUE,
        username text NOT NULL UNIQUE,
        password text NOT NULL,
        display_name text UNIQUE DEFAULT NULL,
        coins integer NOT NULL DEFAULT 20,
        registered_on TEXT NOT NULL DEFAULT '${getDateNow()}',
        login_token TEXT
    );`,
	(err) => {
		if (err) {
			console.error(err);
		} else console.log("database created or already exists");
	}
);

function createDB(db_name) {
	DB.run(
		`CREATE TABLE IF NOT EXISTS ${db_name} ${DB_GAME_SCHEMA};`,
		(err) => {
			if (err) {
				console.error(db_name, err);
			} else console.log(`database ${db_name} created or already exists`);
		}
	);
}

["Roulette", "Blackjack", "Crash", "Jackpot"].map(createDB);

function insertNewUser({ password, email, username, token }, res) {
	DB.run(
		`INSERT INTO ${DB_NAME} (password,email,username, login_token) VALUES (?,?,?,?)`,
		[password, email, username, decode(token)],
		(err) => {
			if (err) {
				return res.json({ err: err.message.split(".")[1] });
			} else {
				DB.all(
					`SELECT * FROM ${DB_NAME} WHERE password=? AND username=?`,
					[password, username],
					(err, rows) => {
						return res.json({
							status: 200,
							res: true,
							coins: rows[0].coins,
							id: rows[0].id,
						});
					}
				);
			}
		}
	);
}

function checkLogin({ password, username, token }, res) {
	DB.all(
		`SELECT * FROM ${DB_NAME} WHERE password=? AND username=?`,
		[password, username],
		(err, rows) => {
			if (err) {
				return res.json({});
			} else {
				if (rows.length !== 0) {
					DB.run(
						`UPDATE ${DB_NAME} SET login_token=? WHERE username=?`,
						[decode(token), username],
						(err) => {
							if (err) {
								console.log(err);
							} else {
								return res.json({
									res: true,
									coins: rows[0].coins,
									id: rows[0].id,
								});
							}
						}
					);
				} else {
					return res.json({});
				}
			}
		}
	);
}

function checkToken(body, res) {
	DB.all(
		`SELECT username, coins, id FROM ${DB_NAME} WHERE login_token=?`,
		[decode(body.token)],
		(err, rows) => {
			if (err) {
				console.error(err);
				return res.json({});
			} else {
				console.log(rows);
				return res.json({
					res: true,
					username: rows[0].username,
					coins: rows[0].coins,
					id: rows[0].id,
				});
			}
		}
	);
}

function setToken({ token, username }, res) {
	DB.run(
		`UPDATE ${DB_NAME} SET login_token=? WHERE username=?`,
		[decode(token), username],
		(err) => {
			if (err) {
				console.log(err);
			} else {
				console.log(`token verified for ${username}`);
				return res.json({ success: true });
			}
		}
	);
}

function hasCoins({ id, coins }, cb) {
	console.log(`hascoins -> ${id} :: ${coins}`);
	console.log(`Approving for id=${id} ...`);
	DB.all(`SELECT coins FROM ${DB_NAME} WHERE id=?`, [id], (err, rows) => {
		if (err) {
			return res.json({});
		} else {
			if (rows.length !== 0) {
				cb({
					approved: rows[0].coins >= coins,
					DBcoins: rows[0].coins,
				});
			}
		}
		console.log(
			`Approving for id=${id} ${rows[0].coins >= coins ? "ok" : "nope"}`
		);
	});
}

function newBet(body) {
	hasCoins({ id: body.id, coins: body.coins }, ({ approved, DBcoins }) => {
		if (approved) {
			console.log(
				`${body.id} betted ${body.coins}, had:${DBcoins}, has:${
					DBcoins - body.coins
				}`
			);
			DB.run(
				`UPDATE ${DB_NAME} SET coins=? WHERE id=?`,
				[DBcoins - body.coins, body.id],
				(err) => {
					if (err) {
						console.log(err);
					} else {
						console.log(`New Bet -> ${body.coins}`);
					}
				}
			);
		}
	});
}

function dumpAll() {
	DB.all(`SELECT * FROM ${DB_NAME}`, [], (err, rows) => {
		if (err) {
			throw err;
		} else {
			console.log(rows);
		}
	});
}

function deleteUsersDB() {
	console.log("DELETED Users DB");
	DB.run(`DELETE FROM TABLE ${DB_NAME}`);
}

module.exports = {
	insertNewUser,
	deleteUsersDB,
	hasCoins,
	newBet,
	dumpAll,
	setToken,
	checkToken,
	checkLogin,
};
