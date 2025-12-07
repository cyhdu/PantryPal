const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" }, // URL to image
    
    // Details
    prepTime: { type: String, default: "0 min" },
    cookTime: { type: String, default: "0 min" },
    servings: { type: Number, default: 1 },
    calories: { type: Number, default: 0 },
    priceEstimate: { type: String, default: "$" }, // $, $$, $$$
    
    tags: [{ type: String }], // Meat, Vegetarian, Breakfast, etc.
    
    // Core Content
    ingredients: [{
        name: { type: String, required: true },
        quantity: { type: String, default: "" } // e.g. "2 cups", "100g"
    }],
    instructions: [{ type: String }],
    
    // Nutrition
    nutrition: {
        protein: { type: String, default: "0g" },
        fat: { type: String, default: "0g" },
        carbs: { type: String, default: "0g" }
    },
    
    isPublic: { type: Boolean, default: true },
    dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recipe', RecipeSchema);