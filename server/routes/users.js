const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

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

            if (password1.length < 6) {
              return res.status(400).json({ message: "The password must be at least 6 characters long." })
            }

            if (password1 !== password2) {
                return res.status(400).json({ message: "Passwords must match!" })
            }

            // Create a new user
            const newUser = new User({
                name,
                email,
                password1,
                password2,
                role: "user", 
                });
            await newUser.save();
            return res.status(201).json({ message: "User created", data: newUser });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Server error", data: error });
        }
    });

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required." });
    }

    // find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email does not exist." });
    }

    // compare passwords
    if (password !== user.password1) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    // create JWT
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role || "user",
      },
      SECRET,
      { expiresIn: "2h" }
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
    return res.status(500).json({ message: "Server error", data: error });
  }
});

router.get("/:id", async (req, res) => {
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
      return res.status(400).json({ message: "The password must be at least 6 characters long." })
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
// ---------------- PROTECTED ROUTE EXAMPLE ----------------
router.get("/private", authenticate, authorize(["admin"]), (req, res) => {
  res.json({
    message: "Welcome to the private route!",
    user: req.user,
  });
});

module.exports = router;
