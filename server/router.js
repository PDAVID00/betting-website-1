const express = require("express");

const router = express.Router();
const sqlite3 = require("sqlite3");

const DB_NAME = "testing"; /* "users" */
const DB_PARAMS = `(
	id,
	password,
	email,
	username,
	display_name,
	coins
 )`;
const db = new sqlite3.Database("./public/database.db", (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log("Connected to db");
});
db.serialize(() => {
	db.run(
		`CREATE TABLE IF NOT EXISTS ${DB_NAME} (
		id integer NOT NULL PRIMARY KEY,
		password text NOT NULL,
		email text NOT NULL UNIQUE,
		username text NOT NULL UNIQUE,
		display_name text,
		coins integer NOT NULL
	 )`,
		(err) => {
			if (err) {
				console.error(err);
			} else console.log("database created or already exists");
		}
	);
});

router.get("/", (req, res) => {
	res.send("Home page");
});

router.get("/profile/:profile", (req, res) => {
	console.log(req.params);
	res.send(req.params);
});

router.post("/auth/Checklogin", (req, res) => {
	console.log(req.body);
	
});

router.post("auth/newUser", (req, res) => {
	console.log(req.body);
	const valid = false;
	if (valid) {
		db.serialize(`INSERT INTO ${DB_NAME} ${DB_PARAMS} VALUES (?,?,?,?,?)`, [req.body], (err) => {
			if (err) {
				console.error(err)
			} else {
				console.log("inserted into db -> ", req.body)
			}
		});
	}
});

module.exports = router;
