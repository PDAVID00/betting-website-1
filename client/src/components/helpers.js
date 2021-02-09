import hash from "object-hash";
import CryptoJS from "crypto-js";

function makeid(length) {
	let result = "";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * characters.length)
		);
	}
	return result;
}

const encrypt = (text) => {
	var key = makeid(64);
	return {
		encrypted: CryptoJS.AES.encrypt(text, key).toString(),
		key: key,
	};
};

const decrypt = (ciphertext, key) =>
	CryptoJS.AES.decrypt(ciphertext, key).toString(CryptoJS.enc.Utf8);

function decode(thing) {
	const div = thing.split(thing.slice(-12));
	return JSON.parse(decrypt(div[0], div[1]));
}

function encode(thing) {
	const { encrypted, key } = encrypt(JSON.stringify(thing));
	const rand = makeid(12);
	return `${encrypted}${rand}${key}${rand}`;
}

export { hash, decode, encode, makeid };
