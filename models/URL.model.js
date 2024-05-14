// src/models/URL.js
const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: String,
    clicks: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('URL', urlSchema);
