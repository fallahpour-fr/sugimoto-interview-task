const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bookControllers = require('../controller/book.controller');

router.get('/', auth ,bookControllers.getBooks);
router.post('/create',bookControllers.createBooks);
router.get('/author-books',bookControllers.findMoreThanFiveBook);
router.get('/avg-books-price',bookControllers.getAverageBookPriceByCountry);
router.post('/sorted-books',bookControllers.getBooksByYearAndSortedByPrice);

module.exports = router;