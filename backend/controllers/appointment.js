const Appointment = require("../modules/appointment");


const addAppointment = (async (req, res) => {

    const { title, date, description, email ,user_id } = req.body;

    if (!email) {
        return res.status(400).json({ message: "user_id is required" });
    }

    try {

        const newAppointment = new Appointment({
            title,
            date,
            description,
            email,
            user_id,
        });

        await newAppointment.save();

        res.status(200).json(newAppointment);
    } catch (error) {
          res.status(400).json(error);
    }

});

const getAppointment =(async(req,res)=>{
    const {email} = req.params;

    if(!email){
        return res.status(400).json({message:"email is required"});
    }

    try {
        const appointment = await Appointment.find({email});
        if(!appointment){
          return res.status(400).json({message:"email is not found"});
        } 

        res.status(200).json(appointment);
    } catch (error) {
         res.status(400).json("getUserMail:",error);
    }
});


const getAppointmentById =(async(req,res)=>{
    const {id} = req.params;

    if(!id){
        return res.status(400).json({message:"id is required"});
    }

    try {
        const appointment = await Appointment.findById(id);
        if(!appointment){
          return res.status(400).json({message:"id is not found"});
        } 

        res.status(200).json(appointment);
    } catch (error) {
         res.status(400).json("getUserId:",error);
    }
});


const editAppointment =(async(req,res)=>{

    const {id} = req.params;
    const {title,description,date,email,user_id}=req.body;

    if(!id){
        return res.status(400).json({message:"id is required"});
    }

    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(id,{title, date, description,email,user_id},{new:true});
         res.status(201).json(updatedAppointment);
    } catch (error) {

        res.status(400).json(`error while you update:${error}`);
    }

});

const deleteAppointment= (async(req,res)=>{
    const {id} = req.params;

    if(!id){
        return res.status(400).json({message:"id is required"});
    }

    try {
       await Appointment.findByIdAndDelete(id);

       res.status(201).json({message:"successfully deleted the Appointment"});
    } catch (error) {
        res.status(400).json("failed to delete:",error);
    }
})


module.exports={addAppointment,getAppointment,editAppointment,deleteAppointment ,getAppointmentById} 