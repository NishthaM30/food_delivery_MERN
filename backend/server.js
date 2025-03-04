const express = require('express');
const cors = require('cors');
const restaurantRoutes = require('./Routes/RestaunrantRoute');
const userRoutes = require('./Routes/UsersRoute');
const menuRoutes = require('./Routes/MenuItemsRoute');
const sequelize = require('./Config/database');

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
require('dotenv').config();

app.use(express.urlencoded({ extended: true }))

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/users', userRoutes);
app.use('/api/menu', menuRoutes)

sequelize.sync({ force: false }).then(() => {
    console.log('Database Synced');
}).catch(err => {
    console.error('Unable to sync the database');
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

})