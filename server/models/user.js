// Load required packages
const mongoose = require('mongoose');

// Define our user schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password1: { type: String, required: true },
    password2: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
    
    // Profile & Settings
    profilePic: { type: String, default: "" },
    settings: {
        currency: { type: String, default: "USD" },
        budgetLimit: { type: Number, default: 0 },
        dietaryPreferences: [{ type: String }], // e.g., "Vegetarian", "Low-Carb"
        healthConcerns: [{ type: String }]     // e.g., "Low-Sodium"
    }
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);