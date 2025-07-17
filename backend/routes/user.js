const express = require("express");
const router= express.Router();
const User =require("../modules/user");
const{resgisterUserOnPost,getUser} =require("../controllers/user");


router.post("/register",resgisterUserOnPost);

router.get("/:email",getUser)


module.exports= router;

