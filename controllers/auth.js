const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");

exports.register = async (req, res, next) => {
	const { name, email, password } = req.body;

	try {
		const user = await User.create({
			name,
			email,
			password,
		});
		sendToken(user, 201, res);
	} catch (error) {
		console.log("error:", error);
		next(error);
	}
};

exports.login = async (req, res, next) => {
	const { email, password } = req.body;

	console.log("body login: ", email, password);

	if (!email || !password)
		return next(
			new ErrorResponse("Please provide an email and password", 400),
		);

	try {
		const user = await User.findOne({ email }).select("+password");

		if (!user) return next(new ErrorResponse("Invalid credentials", 404));

		const isMatch = await user.matchPasswords(password);

		if (!isMatch) return next(new ErrorResponse("Wrong Password", 401));

		sendToken(user, 200, res);
	} catch (error) {
		res.status(500).json({ error });
	}

	// console.log("body login: ", req.body);
	// res.send({ message: "ok" });
};

exports.refreshToken = async (req, res, next) => {
	// console.log("body refresh token : ", req.cooksies);

	const refreshToken = req.cookies.refreshToken;
	try {
		if (!refreshToken)
			res.status(400).json({ success: true, error: "Not Found Token" });

		const decode = jwt.verify(refreshToken, process.env.refresh_token_secret);

		const user = await User.findById(decode.id);

		if (!user) next(new ErrorResponse("No user found with this id", 404));

		const accessToken = await user.getAccessToken();
		console.log("after all: ", accessToken, user);
		res.json({ accessToken, user });
	} catch (err) {
		console.log("erorr: ", err);
		next(err);
	}
};

// exports.getPrivateData = (req, res) => {
// 	res.status;
// };

const sendToken = async (user, statusCode, res) => {
	const accessToken = await user.getAccessToken();
	const refreshToken = await user.getRefreshToken();

	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		path: "/api/refresh",
		maxAge: 7 * 60 * 60 * 1000, //7d
	});

	// console.log("token: ", accessToken);
	return res.status(statusCode).json({
		success: true,
		accessToken,
		user: user,
	});
};
