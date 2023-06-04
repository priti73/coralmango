const Review = require('../models/review');

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({ where: { restaurantId: req.params.id } });
 
    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching reviews' });
  }
};

exports.submitReview = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const { review } = req.body;

    // Create a new review record in the database
    const newReview = await Review.create({
      restaurantId,
      review,
      timestamp: new Date(),
    });

    res.status(200).json({ message: 'Review submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while submitting the review' });
  }
};
