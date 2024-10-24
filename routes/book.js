const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bookControllers = require('../controller/book.controller');

router.get('/', auth ,bookControllers.getBooks);
router.post('/create',bookControllers.createBooks);

module.exports = router;