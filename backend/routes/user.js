const express = require("express");
const router= express.Router();
const User =require("../modules/user");
const{registerUserOnPost,loginUser} =require("../controllers/user");


router.post("/register",registerUserOnPost);

router.get("/login",loginUser)


module.exports= router;

