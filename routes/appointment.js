const {
	makeAppointment,
	getAppointments,
} = require("../controllers/appointment");

const router = require("express").Router();

router.route("/appointment").post(makeAppointment);

router.route("/appointment/:id").get(getAppointments);

module.exports = router;
