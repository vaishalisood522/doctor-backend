const { model, Schema } = require("mongoose");

const appointmentSchema = Schema(
	{
		doctor_id: {
			type: String,
			required: [true],
		},
		user_id: {
			type: String,
			required: true,
		},

		user_name: {
			type: String,
		},
		user_email: {
			type: String,
		},
		time: { type: String },
		date: { type: String },
	},
	{
		timestamps: true,
	},
);

exports.Appointment = model("Appointment", appointmentSchema);
