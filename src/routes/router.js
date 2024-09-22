const express = require('express');
const { signUp, login } = require('../controllers/signup.Controller'); // Import your controllers
const router = express.Router();

// Serve the signup form (HTML file)
// router.get('/signup', (req, res) => {
//     res.sendFile(path.join(__dirname, '../signup.html')); // Ensure path is correct
// });

// Handle signup form submission
router.post('/signup', signUp);

// Serve login form (if you have a separate login page, similar to signup)
// router.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, '../login.html')); // Ensure path is correct
// });

// Handle login form submission
router.post('/login', login);

module.exports = { router };
