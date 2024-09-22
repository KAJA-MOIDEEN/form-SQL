const express = require('express');
const cors = require('cors');
const { router } = require('./routes/router'); // Import router

const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON bodies (application/json)
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (application/x-www-form-urlencoded)
app.use(cors()); // Allow all origins (you can customize as needed)

// Use the router for API routes
app.use('/v1', router);

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Ensure index.html is in the root folder
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
