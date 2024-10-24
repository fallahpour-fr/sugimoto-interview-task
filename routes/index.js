const express = require('express');
const router = express.Router();
const bookRoutes = require('./book');

router.use('/books',bookRoutes);

module.exports = router;