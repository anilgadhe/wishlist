const User = require("../modules/user");
const bcrypt = require("bcrypt")

// Register User
const registerUserOnPost = async (req, res) => {
    const { user_name, password, mobile, email } = req.body;

    try {
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "User already exists" });
        }

        let hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            user_name,
            password: hashedPassword,
            email,
            mobile
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });

    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ message: "Server error" });
    }
}

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // plain comparison
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        res.status(200).json(user);


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Login failed" });
    }
};

module.exports = { registerUserOnPost, loginUser };
