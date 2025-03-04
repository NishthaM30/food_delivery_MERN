const Menu = require('../Models/MenuModel');
const { validationResult } = require('express-validator');
const Restaurant = require('../Models/RestaunrantModel');

const createMenu = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { restaurant_id, name, description, price, image } = req.body;
    try {
        const menuItem = await Menu.create({
            restaurant_id,
            name,
            description,
            price,
            image
        });
        res.status(201).json({
            message: 'Menu Item created successfully',
            data: menuItem
        });
    } catch (error) {
        console.error('Error creating menu item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getMenuItems = async (req, res) => {
    const { restaurant_id } = req.params;
    try {
        const menuItems = await Menu.findAll({
            where: { restaurant_id },
            include: [{ model: Restaurant, attributes: ['name'] }]
        });
        if (menuItems.length === 0) {
            return res.status(404).json({ message: 'No menu item found for this restaurant' })
        }
        res.json(menuItems)
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Internal Server error' })
    }
};

const getMenuItemById = async (req, res) => {
    const { id } = req.params;
    try {
        const menuItem = await Menu.findByPk(id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(menuItem)
    } catch (error) {
        console.error('Error fetching menu item', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateMenuItem = async (req, res) => {
    const { id } = req.params;
    const { restaurant_id, name, description, price, image } = req.body;
    try {
        const menuItem = await Menu.findByPk(id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        //update menu item
        menuItem.restaurant_id = restaurant_id || menuItem.restaurant_id;
        menuItem.name = name || menuItem.name;
        menuItem.description = description || menuItem.description;
        menuItem.price = price || menuItem.price;
        menuItem.image = image || menuItem.image;

        await menuItem.save();
        res.json({
            message: 'Menu item updated successfully',
            data: menuItem
        });
    } catch (error) {
        console.error('Error updating menu item', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteMenuItem = async (req, res) => {
    const { id } = req.params;
    try {
        const menuItem = await Menu.findByPk(id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        await menuItem.destroy();
        res.json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        console.error('Error deleting menu item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { createMenu, getMenuItems, getMenuItemById, updateMenuItem, deleteMenuItem }