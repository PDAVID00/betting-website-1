const express = require("express");

const router = express.Router();
const databaseAPI = require("./databaseAPI");

router.get("/", (req, res) => {
	res.send("Home page");
});

router.get("/profile/:profile", (req, res) => {
	console.log(req.params);
	res.send(req.params);
});

router.post("/auth/Checklogin", (req, res) => {
	databaseAPI.checkLogin(req.body, res);
});

router.post("/auth/newUser", (req, res) => {
	console.log("body -> ", req.body);
	databaseAPI.insertNewUser(req.body, res);
});

router.get("/auth/deleteUsersDB", (req, res) => {
	databaseAPI.deleteUsersDB();
});

router.post("/auth/checktoken", (req, res) => {
	databaseAPI.checkToken(req.body, res);
});

router.post("/auth/setToken", (req, res) => {
	databaseAPI.setToken(req.body, res);
});

router.get("/warp/caralho", (req, res) => {
	return res.send("<h1>O CARALHO</h1>");
});

module.exports = router;
