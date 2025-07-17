const { type } = require("express/lib/response");
const {Schema , model, now}= require("mongoose");


const appointmentSchema = new Schema({

    title:String,
    date:{
      type:Date,
      default: Date.now,
    },
    description: String,

    email: {
      type: String,
      require:true,
    },

    user_id:{
      type:Schema.Types.ObjectId,
      ref:"User",  
    }
});

const Appointment = model('Appointment',appointmentSchema);

module.exports= Appointment;