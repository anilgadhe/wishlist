const express = require("express");
const router= express.Router();
const User =require("../modules/user");
const{registerUserOnPost,loginUser} =require("../controllers/user");


router.post("/register",registerUserOnPost);

router.post("/login",loginUser)


module.exports= router;

