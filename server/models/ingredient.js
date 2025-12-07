const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    category: { type: String, default: 'other' }, // meat, vegetable, grain, etc.
    quantity: { type: Number, default: 1 },
    unit: { type: String, default: 'pc' }, // pc, kg, lb, etc.
    expiryDate: { type: Date },
    calories: { type: Number, default: 0 }, // per unit
    dateAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ingredient', IngredientSchema);
