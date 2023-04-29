const { Favorite } = require("../models/Favorite");

exports.addToFavorite = async (req, res, next) => {
	const { user_id, doctor_id } = req.body;

	console.log("user: ", user_id, doctor_id);
	try {
		const favorite = await Favorite.create({
			doctor_id,
			user_id,
		});
		res.status(200).json({
			success: true,
			message: "added to favorites",
			favorite,
		});
	} catch (error) {
		next(error);
	}
};

exports.removeFromFavortie = async (req, res, next) => {
	try {
		await Favorite.findByIdAndDelete(req.body.id);
	} catch (error) {
		next(error);
	}
};

exports.getFavorites = async (req, res, next) => {
	console.log("id: ", req.params);
	try {
		const favorites = await Favorite.find({ user_id: req.params.id });
		console.log("favorites: ", favorites);
		if (!favorites) res.status(400).json({ message: "no favorites found" });
		res.status(200).json({ favorites });
	} catch (error) {
		next(error);
	}
};
