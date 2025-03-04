const Restaurant = require('../Models/RestaunrantModel');

const getAllRestaurants = async (req, res) => {
    try {
        const restaurant = await Restaurant.findAll();
        res.json(restaurant)
    } catch (error) {
        console.error('Error fetching restaurants', error);
        res.status(500).json({ error: 'Error fetching restaurants' });
    }
}

const getRestaurantDetails = async (req, res) => {
    const {id} = req.params;
    try {
        const details = await Restaurant.findByPk(id);
        if(!details){
            return res.status(404).json({message: 'Resturant not found'});
        }
        res.json(details);
    } catch (error) {
        console.error('Error fetching restaurant details', error);
        res.status(500).json({ error: 'Error fetching restaurant details' })
    }
}

module.exports = { getAllRestaurants, getRestaurantDetails };