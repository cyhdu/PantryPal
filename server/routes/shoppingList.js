const router = require("express").Router();
const ShoppingList = require("../models/shoppingList");
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

// GET /api/shopping-list - Get user's list
router.get("/", authenticate, async (req, res) => {
  try {
    let list = await ShoppingList.findOne({ user: req.user.userId });
    if (!list) {
      // Create empty list if none exists
      list = new ShoppingList({ user: req.user.userId, items: [] });
      await list.save();
    }
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/shopping-list/items - Add item
router.post("/items", authenticate, async (req, res) => {
  try {
    const { name, amount } = req.body;
    let list = await ShoppingList.findOne({ user: req.user.userId });
    if (!list) {
      list = new ShoppingList({ user: req.user.userId, items: [] });
    }
    
    list.items.push({ name, amount, isChecked: false });
    await list.save();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// PUT /api/shopping-list/items/:itemId - Toggle check or update
router.put("/items/:itemId", authenticate, async (req, res) => {
  try {
    const list = await ShoppingList.findOne({ user: req.user.userId });
    if (!list) return res.status(404).json({ message: "List not found" });

    const item = list.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (req.body.isChecked !== undefined) item.isChecked = req.body.isChecked;
    if (req.body.name) item.name = req.body.name;
    if (req.body.amount) item.amount = req.body.amount;

    await list.save();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE /api/shopping-list/items/:itemId - Remove item
router.delete("/items/:itemId", authenticate, async (req, res) => {
  try {
    const list = await ShoppingList.findOne({ user: req.user.userId });
    if (!list) return res.status(404).json({ message: "List not found" });

    // Filter out the item
    list.items = list.items.filter(item => item._id.toString() !== req.params.itemId);
    
    await list.save();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
