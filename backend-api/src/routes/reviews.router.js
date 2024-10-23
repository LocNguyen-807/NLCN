const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

module.exports.setup = (app) => {
    app.use('/api/reviews', router);

    router.get('/', reviewController.getAllReviews);
    router.post('/', reviewController.createReview);
    router.put('/:id', reviewController.updateReview);
    router.delete('/:id', reviewController.deleteReview);
}

module.exports = router;