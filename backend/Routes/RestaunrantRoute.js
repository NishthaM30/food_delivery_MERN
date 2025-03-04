const express = require('express');
const { getAllRestaurants, getRestaurantDetails } = require('../Controllers/RestaunrantController');

const router = express.Router();

router.get('/get_restaurants', getAllRestaurants);
router.get('/get_restaurant_details/:id', getRestaurantDetails);

module.exports = router;