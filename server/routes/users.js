const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SECRET = "mysecretkey";

function authenticate(req, res, next) {
  const token = req.headers["x-authorization"];

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    // Decode + verify token
    const decoded = jwt.verify(token, SECRET);

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next(); // proceed to route
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
// ---------------- AUTHORIZATION MIDDLEWARE ----------------
function authorize(allowedRoles = []) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "User does not have sufficient rights" });
    }
    next();
  };
}


router.post("/signup", async (req, res) => {
  try {
    const { name, email, password1, password2 } = req.body;

    if (!name || !email || !password1 || !password2) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "A user with that email already exists." });
    }

    if (password1.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    if (password1 !== password2) {
      return res.status(400).json({ message: "Passwords must match." });
    }

    // HASH PASSWORD
    // HASH BOTH PASSWORD1 AND PASSWORD2
    const hashed1 = await bcrypt.hash(password1, 10);
    const hashed2 = await bcrypt.hash(password2, 10);

    const newUser = new User({
      name,
      email,
      password1: hashed1,
      password2: hashed2,
      role: "user",
    });

    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email does not exist." });
    }

    // Compare hash
    const validPassword = await bcrypt.compare(password, user.password1);
    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role || "user",
      },
      SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      userId: user._id,
      username: user.name,
      email: user.email,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      userId: user._id,
      username: user.name,
      email: user.email
    });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
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

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords must match." });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({ message: "Password reset successfully." });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", (req, res) => {
  return res.status(200).json({ message: "Logged out" });
});

// Update username and password in setting

// UPDATE USERNAME
router.patch("/:id", authenticate, async (req, res) => {
  try {
    const { username } = req.body;

    if (!username || username.trim() === "") {
      return res.status(400).json({ message: "Username cannot be empty." });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found." });

    user.name = username; // Your DB uses "name"
    await user.save();

    return res.status(200).json({ message: "Username updated successfully." });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error." });
  }
});

// UPDATE PASSWORD
router.patch("/:id/password", authenticate, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Missing fields." });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found." });

    // check old password
    const valid = await bcrypt.compare(oldPassword, user.password1);
    if (!valid) {
      return res.status(400).json({ message: "Old password is incorrect." });
    }

    // hash new password
    const hashed = await bcrypt.hash(newPassword, 10);

    // update both password fields
    user.password1 = hashed;
    user.password2 = hashed;

    await user.save();

    return res.status(200).json({ message: "Password updated successfully." });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error." });
  }
});



// ---------------- PROTECTED ROUTE EXAMPLE ----------------
router.get("/private", authenticate, authorize(["admin"]), (req, res) => {
  res.json({
    message: "Welcome to the private route!",
    user: req.user,
  });
});

module.exports = router;
