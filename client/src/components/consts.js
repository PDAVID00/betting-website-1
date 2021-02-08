const PORT = 80;
const BACK_END_URL =
	process.env.NODE_ENV === "dev"
		? `localhost:${PORT}`
		: "https://lucid-euler-bab96c.netlify.app/";

module.exports = { BACK_END_URL };
