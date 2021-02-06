const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
	res.send("Home page");
});

router.get("/profile:profile_name", (req, res) => {
	console.log(req.params)
})


module.exports = router;
