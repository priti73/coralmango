const express = require('express');
const router = express.Router();
const restaurantController = require('../controller/restaurant');
const reviewController = require('../controller/review');

router.get('/restaurants', restaurantController.getAllRestaurants);
router.get('/restaurant/:id', restaurantController.getRestaurantDetails);
router.get('/restaurant/:id/reviews', reviewController.getAllReviews);
router.post('/restaurant/:id/reviews', reviewController.submitReview);


module.exports = router;

