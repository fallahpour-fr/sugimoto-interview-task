const express = require('express');
const router = express.Router();
const bookControllers = require('../controller/book.controller');

router.get('/books', bookControllers.getBooks);

module.exports = router;