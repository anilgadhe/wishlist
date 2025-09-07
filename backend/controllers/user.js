const User = require("../modules/user");
const  bcrypt = require("bcrypt");


async function resgisterUserOnPost(req, res) {
    const { user_name, password, mobile, email } = req.body;

    try {

        const existing = await User.findOne({ email });

        if (existing) {
            return res.status(400).json("user already exist");
        }

        let hashedPassword = bcrypt.hash(password,10);

        const newUser = new User({
            user_name,
            password:hashedPassword,
            email,
            mobile
        })

        await newUser.save();
        res.status(201).json({ message: "user register successfully", user: newUser })

    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ message: "Server error" });
    }


}


const getUser = (async (req, res) => {
    const { email ,password} = req.body;

    if (!email) {
        return res.status(400).json({ message: "undefined email" });
    }

    try {
        const user = await User.findOne({email});

        
        if (!user) {
            return res.status(400).json({ message: "user is not identified" });
        }else{
           let  ismatching = await bcrypt.compare(password , user.password);

           if(!ismatching){
            return res.status(400).json({message:"worng password"});
           }
           res.status(200).json(user);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"user not found"})
    }
});


module.exports = { resgisterUserOnPost, getUser }