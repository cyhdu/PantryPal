const router = require("express").Router();
const Recipe = require("../models/recipe");
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

// GET /api/recipes - Get all public recipes or user's own
router.get("/", authenticate, async (req, res) => {
  try {
    // Fetch public recipes OR recipes created by this user
    const recipes = await Recipe.find({
      $or: [
        { isPublic: true },
        { author: req.user.userId }
      ]
    }).sort({ dateCreated: -1 });
    
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/recipes/:id - Get single recipe
router.get("/:id", authenticate, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("author", "name");
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/recipes - Create new recipe
router.post("/", authenticate, async (req, res) => {
  try {
    const newRecipe = new Recipe({
      author: req.user.userId,
      ...req.body
    });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// PUT /api/recipes/:id - Update recipe (only owner)
router.put("/:id", authenticate, async (req, res) => {
  try {
    console.log("PUT Recipe - ID:", req.params.id);
    console.log("User ID:", req.user.userId);
    
    const recipe = await Recipe.findOne({ _id: req.params.id, author: req.user.userId });
    
    if (!recipe) {
      console.log("Recipe not found or user not author.");
      return res.status(404).json({ message: "Recipe not found or unauthorized" });
    }

    Object.assign(recipe, req.body);
    await recipe.save();
    res.json(recipe);
  } catch (err) {
    console.error("Error in PUT /recipes/:id:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE /api/recipes/:id - Delete recipe (only owner)
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ _id: req.params.id, author: req.user.userId });
    if (!recipe) return res.status(404).json({ message: "Recipe not found or unauthorized" });
    
    await Recipe.deleteOne({ _id: req.params.id });
    res.json({ message: "Recipe deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;