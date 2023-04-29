const jwt = require("jsonwebtoken");

// const User = require("../models/User");
// const ErrorResponse = require("../utils/errorResponse");
const { User } = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");

exports.protect = async (req, res, next) => {
	let token;

	// console.log("came in protect iwth token: ", req.headers.authorization);
	const headers = req.headers.authorization;
	if (headers && headers.startsWith("Bearer")) {
		token = headers.split(" ")[1];
	}

	if (!token) {
		return next(
			new ErrorResponse("Not authorized to access this route yes not", 401),
		);
	}

	try {
		console.log("token: ", token);
		const decode = jwt.verify(token, process.env.access_token_secret);
		console.log("decode: ", decode);
		const user = await User.findById(decode.id);
		console.log("user; ", user);

		if (!user) {
			return next(new ErrorResponse("No user found", 404));
		}

		req.user = user;

		next();
	} catch (error) {
		next(new ErrorResponse("Not authorized to access this route", 401));
	}
};
