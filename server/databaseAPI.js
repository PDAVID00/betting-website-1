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
				console.log(`DB-INSERT-${err.message.split(".")[1]}`);
				return res.json({ err: err.message.split(".")[1] });
			} else {
				return res.json({ status: 200 });
			}
		}
	);
}

function checkLogin({ password, username }, res) {
	DB.all(
		`SELECT * FROM ${DB_NAME} WHERE password=? AND username=?`,
		[password, username],
		(err, rows) => {
			console.log("rows -> ", rows);
			if (err) {
				console.error(err);
				return res.json({});
			} else {
				return res.json({
					res: true,
				});
			}
		}
	);
}

function checkToken(body, res) {
	DB.all(
		`SELECT username, coins FROM ${DB_NAME} WHERE login_token=?`,
		[decode(body.token)],
		(err, rows) => {
			if (err) {
				console.error(err);
				return res.json({});
			} else {
				return res.json({
					res: true,
					username: rows[0].username,
					coins: rows[0].coins,
				});
			}
		}
	);
}

function setToken(body, res) {
	DB.run(
		`UPDATE ${DB_NAME} SET login_token=? WHERE username=?`,
		[decode(body.token), body.username],
		(err) => {
			if (err) {
				console.log(err);
			} else {
				return res.json({ success: true });
			}
		}
	);
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
	console.log("");
	DB.run(`DELETE FROM TABLE ${DB_NAME}`);
}

module.exports = {
	insertNewUser,
	deleteUsersDB,
	dumpAll,
	setToken,
	checkToken,
	checkLogin,
};
