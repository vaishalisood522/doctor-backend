const express = require("express");
const {
	getFavorites,
	addToFavorite,
	removeFromFavortie,
} = require("../controllers/favorite");
const router = express.Router();

router.route("/favorite").post(addToFavorite).delete(removeFromFavortie);

router.route("/favorite/:id").get(getFavorites);

module.exports = router;
