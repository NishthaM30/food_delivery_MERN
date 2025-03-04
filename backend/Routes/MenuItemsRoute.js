const express = require('express');
const { validateMenuItem } = require('../Validators/menuValidator');
const { createMenu, getMenuItems, getMenuItemById, updateMenuItem, deleteMenuItem } = require('../Controllers/MenuItemsController');

const router = express.Router()

router.post('/', validateMenuItem, createMenu);
router.get('/:restaurant_id',getMenuItems);
router.get('/item/:id',getMenuItemById);
router.put('/item/:id', validateMenuItem, updateMenuItem);
router.delete('/item/:id', deleteMenuItem);

module.exports = router;