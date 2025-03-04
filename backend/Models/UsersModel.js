const { DataTypes } = require('sequelize');
const sequelize = require('../Config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[\d\+\-\.\(\)\/\s]*$/i
        }
    },
    role: {
        type: DataTypes.ENUM('admin', 'customer', 'manager'),
        allowNull: false,
        defaultValue: 'customer'
    }
}, {
    tableName: 'users',
    timestamps: false
});

User.beforeCreate(async (user) => {
    if(user.password){
        user.password = await bcrypt.hash(user.password, 10)
    }
});

module.exports = User;