const express = require("express");
const router = express.Router();
const restaurantController = require("../controller/restaurant");
const reviewController = require("../controller/review");
const countResController = require("../controller/countRes");

router.get("/restaurants", restaurantController.getAllRestaurants);
router.get("/restaurant/:id", restaurantController.getRestaurantDetails);
router.get("/restaurant/:id/reviews", reviewController.getAllReviews);
router.post("/restaurant/:id/reviews", reviewController.submitReview);
router.get("/admin/analytics", countResController.analytics);

module.exports = router;
