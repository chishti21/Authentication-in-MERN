const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Ensure this model is named 'User' if that's your schema name

// Define the route
router.post('/register', async (req, res) => { // No need for '/register' here as it's already defined in app.js
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });
        await newUser.save();
        res.send("register successful");
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred");
    }
});

module.exports = router;
