const User = require("../modules/user");



async function resgisterUserOnPost(req, res) {
    const { user_name, password, mobile, email } = req.body;

    try {

        const existing = await User.findOne({ email });

        if (existing) {
            return res.status(400).json("user already exist");
        }

        const newUser = new User({
            user_name,
            password,
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
    const { email } = req.params;
    if (!email) {
        return res.status(400).json({ message: "undefined email" });
    }

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ message: "user is not identified" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"user not found"})
    }
});


module.exports = { resgisterUserOnPost, getUser }