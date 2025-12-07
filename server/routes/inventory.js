const router = require("express").Router();
const Ingredient = require("../models/ingredient");
const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey";

function authenticate(req, res, next) {
  const token = req.headers["x-authorization"];
  if (!token) return res.status(401).json({ message: "Missing token" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

// GET /api/inventory - Get all ingredients for user
router.get("/", authenticate, async (req, res) => {
  try {
    const ingredients = await Ingredient.find({ user: req.user.userId }).sort({ dateAdded: -1 });
    res.json(ingredients);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/inventory - Add new ingredient
router.post("/", authenticate, async (req, res) => {
  try {
    const { name, category, quantity, unit, expiryDate, calories } = req.body;
    
    const newIngredient = new Ingredient({
      user: req.user.userId,
      name,
      category,
      quantity,
      unit,
      expiryDate,
      calories
    });

    await newIngredient.save();
    res.status(201).json(newIngredient);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// PUT /api/inventory/:id - Update ingredient
router.put("/:id", authenticate, async (req, res) => {
  try {
    const updatedIngredient = await Ingredient.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true }
    );
    if (!updatedIngredient) return res.status(404).json({ message: "Ingredient not found" });
    res.json(updatedIngredient);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE /api/inventory/:id - Delete ingredient
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const result = await Ingredient.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    if (!result) return res.status(404).json({ message: "Ingredient not found" });
    res.json({ message: "Ingredient deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
