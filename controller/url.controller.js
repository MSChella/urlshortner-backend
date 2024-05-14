require('dotenv').config();



const URL = require('../models/URL.model');


const urlController = {
    shortenURL: async (req, res) => {
        try {
            const { originalURL } = req.body;
            // Implement logic to shorten the URL and save it to the database
            const url = new URL({ originalURL });
            await url.save();
            res.status(201).json({ shortURL: url.shortURL });
        } catch (error) {
            console.error('Error shortening URL:', error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    redirectURL: async (req, res) => {
        try {
            const { shortUrl } = req.params;
            // Implement logic to redirect to the original URL based on the short URL
            const url = await URL.findOne({ shortURL: shortUrl });
            if (!url) {
                return res.status(404).json({ message: 'URL not found' });
            }
            res.redirect(url.originalURL);
        } catch (error) {
            console.error('Error redirecting URL:', error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    getStats: async (req, res) => {
        try {
            // Implement logic to retrieve and return statistics for URLs
            const stats = await URL.aggregate([
                // Example aggregation pipeline to get statistics
                { $group: { _id: null, totalURLs: { $sum: 1 } } },
            ]);
            res.json({ stats });
        } catch (error) {
            console.error('Error getting URL statistics:', error);
            res.status(500).json({ message: 'Server Error' });
        }
    },
};

module.exports = urlController;
