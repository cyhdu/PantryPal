const mongoose = require('mongoose');

const ShoppingListSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [{
        name: { type: String, required: true },
        amount: { type: String, default: "1" },
        isChecked: { type: Boolean, default: false }
    }],
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ShoppingList', ShoppingListSchema);
