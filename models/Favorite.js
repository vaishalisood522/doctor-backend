const { model, Schema } = require("mongoose");

const favoriteSchema = Schema({
	user_id: { type: String },
	doctor_id: {
		type: String,
	},
});

exports.Favorite = model("Favorite", favoriteSchema);
