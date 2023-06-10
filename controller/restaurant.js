const Restaurant = require('../models/restaurant');
const Review = require('../models/review');

exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.status(200).json({ restaurants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching restaurants' });
  }
};

exports.getRestaurantDetails = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findByPk(restaurantId ); 
    res.status(200).json({ restaurant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching restaurant details' });
  }
};



