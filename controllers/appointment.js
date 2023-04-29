const { Appointment } = require("../models/Appointment");

exports.makeAppointment = async (req, res, next) => {
	const { doctor_id, user_id, user_email, user_name, time, date } = req.body;

	console.log("body: ", req.body);
	try {
		const appointment = await Appointment.create({
			doctor_id,
			user_email,
			user_id,
			user_name,
			time,
			date,
		});

		if (!appointment) return res.status(500).json({ success: false });

		res.status(200).json({
			appointment,
			message: "created Appointment",
			success: true,
		});
	} catch (error) {
		next(error);
	}
};

exports.getAppointments = async (req, res, next) => {
	try {
		const appointments = await Appointment.find({ user_id: req.params.id });
		// if (!appointments) res..json({ appointments: [] });
		res.status(200).json({ appointments });
	} catch (error) {
		next(error);
	}
};
