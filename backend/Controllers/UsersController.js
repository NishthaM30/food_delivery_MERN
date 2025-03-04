const sequelize = require('../Config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator');
const User = require('../Models/UsersModel');
const { Op } = require('sequelize');

const allowedRoles = ['admin', 'customer', 'manager'];
const JWT_SECRET_KEY = 'c19cb49642c40c6eda2940b6282b67c334285aef5d75a3ee79c8d6eba2328ceaeeaf3700b1d503534253de48e9e9b8549462c4871d3a1fe6020dcf4b5b7e8a41'

const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { username, password, email, address, phone, role } = req.body;

    try {
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { username },
                    { email }
                ]
            }
        })
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists.' })
        }

        const userRole = allowedRoles.includes(role) ? role : 'cutomer';

        const newUser = await User.create({
            username, password,
            email, address, phone, role: userRole
        });

        res.status(201).json({
            message: 'User Registered Successfully',
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            address: newUser.address,
            phone: newUser.phone,
            role: newUser.role
        })
    } catch (error) {
        console.error('Error Registering User', error);
        res.status(500).json({ error: 'Internal server error' })
    }
}

const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            where: { email: email }
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' })
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid username or password' })
        }
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login Successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                address: user.address,
                phone: user.phone,
                role: user.role
            }
        })
    } catch (error) {
        console.error('Error During Login', error);
        res.status(500).json({ error: 'Internal Server error' })
    }
}

module.exports = { registerUser, loginUser };