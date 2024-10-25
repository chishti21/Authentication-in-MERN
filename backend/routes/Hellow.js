const express = require('express');
const router = express.Router();

// Define the route
router.get('/', (req, res) => {
  res.send('Hello World1');
});

// Export the router
module.exports = router;