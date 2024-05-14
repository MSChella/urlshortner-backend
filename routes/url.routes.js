// src/routes/url.js
const express = require('express');
const router = express.Router();
const urlController = require('../controller/url.controller');
const authMiddleware = require('../utils/authMiddleware');

router.post('/shorten', authMiddleware, urlController.shortenURL);
router.get('/:shortUrl', urlController.redirectURL);
router.get('/dashboard/stats', authMiddleware, urlController.getStats);

module.exports = router;
