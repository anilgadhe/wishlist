require('dotenv').config(); 
const express = require("express");
const cors = require("cors");
const mongoose =  require("mongoose");
const connection = require("./connection");
const userRouter = require("./routes/user");
const appointmentRouter= require("./routes/appointment");
const app = express();
const PORT =process.env.PORT || 8080;


connection(process.env.Mongo_URL).then(()=>{
    console.log('database connected successfully');
    
}).catch((err)=>{
    console.log(`database:${err}`);
    
})

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());



app.use("/user",userRouter);
app.use("/appointment",appointmentRouter);

app.use((req,res)=>{
    res.status(404).write("Not Found path your serch for");
})


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
    
})


