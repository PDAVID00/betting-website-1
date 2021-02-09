const PORT = 80;
const BACK_END_URL = `http://localhost:${PORT}`;

const POST_HEADER = {
	Accept: "application/json, text/plain, */*",
	"Content-Type": "application/json",
};

module.exports = { BACK_END_URL, POST_HEADER };
