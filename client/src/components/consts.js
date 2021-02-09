const PORT = 80;
const BACK_END_URL = `https://betting-website-375b7.web.app`;
/* process.env.NODE_ENV === "PROD"
		? `https://betting-website-375b7.web.app`
		: `http://localhost:${PORT}` */ const POST_HEADER = {
	Accept: "application/json, text/plain, */*",
	"Content-Type": "application/json",
};

const AUTH_REQUISITES = {
	email: { has: ["@", "."], len: 10 },
	username: { len: 5 },
	password: { len: 8 },
};

module.exports = { BACK_END_URL, POST_HEADER, AUTH_REQUISITES };
