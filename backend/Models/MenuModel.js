const { DataTypes } = require('sequelize');
const sequelize = require('../Config/database');
const Restaurant = require('./RestaunrantModel');

const Menu = sequelize.define('Menu', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Restaurant,
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isDecimal: true,
            min: 0
        }
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'menu_items',
    timestamps: false
});

Menu.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });

module.exports = Menu;