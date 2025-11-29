const router = require("express").Router();
const User = require("../models/user");


router.post("/signup", async function (req, res) {   
        try {
            const { name, email, password1, password2 } = req.body;

            // Validation on name and email 
            if (!name || !email || !password1 || !password2) {
                return res.status(400).json({ message: "All fields are required." })
            }

            // Check duplicate emails
            const existingEmail = await User.findOne({ email:email });
            if (existingEmail) {
                return res.status(400).json({ message: "A user with that email already exists." })
            }

            if (password1 != password2) {
                return res.status(400).json({ message: "Passwords must match!" })
            }

            // Create a new user
            const newUser = new User({
                name,
                email,
                password1,
                password2, 
                });
            await newUser.save();
            return res.status(201).json({ message: "User created", data: newUser });
        } catch (error) {
            return res.status(500).json({ message: "Server error", data: error });
        }
    });

router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: "Username and password required." });
    }

    // find by username
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(400).json({ message: "Username does not exist." });
    }

    // compare password (plain for now)
    if (password !== user.password1) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    return res.status(200).json({ message: "Login successful", user });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", data: error });
  }
});

router.post("/resetpassword", async (req, res) => {
  try {
    const { name, newPassword, confirmPassword } = req.body;

    if (!name || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "Missing fields." });
    }

    const user = await User.findOne({ name });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords must match." });
    }

    user.password1 = newPassword;
    user.password2 = confirmPassword;
    await user.save();

    return res.status(200).json({
      message: "Password reset successfully.",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", data: error });
  }
});


module.exports = router;
