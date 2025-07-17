const { type } = require("express/lib/response");
const {Schema ,model}= require("mongoose");


const userSchema = new Schema({
    user_name:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
       required:true,  
    },

    mobile:{
        type:Number,
    }

});

const User =  model('User',userSchema);

module.exports= User;

