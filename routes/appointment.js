const express = require("express");
const router = express.Router();
const{addAppointment,getAppointment,editAppointment,deleteAppointment,getAppointmentById}=require("../controllers/appointment")


router.post("/",addAppointment);

router.get("/:email",getAppointment);

router.get("/ap/:id",getAppointmentById)

router.put("/edit/:id",editAppointment);

router.delete("/delete/:id",deleteAppointment)

module.exports = router;