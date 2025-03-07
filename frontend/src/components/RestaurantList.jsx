import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurants } from '../features/restaurantSlice';
import {Button, CircularProgress, Card, CardContent, Typography, Grid} from '@mui/material'
import { useNavigate } from 'react-router-dom';

const RestaurantList = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector((state) => state.restaurants.restaurants);
  const status = useSelector((state) => state.restaurants.status);
  const isAdmin = useSelector((state) => state.restaurants.isAdmin);
  const navigate = useNavigate();

  // const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getRestaurants());
    }
  }, [status, dispatch]);

  // const handleAddRestaurant = () => {
  //   setShowAddModal(true);
  // };

  const handleRestaurantClick = (id) => {
    navigate(`/restaurant/${id}`)
  };

  return (
    <div className='restaurant-list' style={{padding:'20px'}}>
      <Typography variant='h4' gutterBottom>
        Restaurant List
      </Typography>
      {/* {isAdmin && (
        <button onClick={handleAddRestaurant} className='add-restaurant'>
          Add Restaurant
        </button>
      )} */}
      {status === 'loading' && <CircularProgress/>}
      {status === 'failed' && <Typography color='error'>Error Loading Restaurants...</Typography>}

      {/* Restaurant List */}
      <Grid container spacing={3}>
        {Array.isArray(restaurants) && restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
              <Card onClick={() => handleRestaurantClick(restaurant.id)}
                sx={{ cursor:'pointer', transition:'0.3s', '&:hover':{boxShadow:4}}}>
                  <CardContent>
                    <Typography variant='h6'>{restaurant.name}</Typography>
                    <Typography color='textSecondary'>{restaurant.address}</Typography>
                    <Typography variant='body2' color='textSecondary'>{restaurant.cuisine}</Typography>
                  </CardContent>
                </Card>
            </Grid>
          ))
        ) : (
          <Typography>No restaurants available</Typography>
        )}
      </Grid>
    </div>
  );
};

export default RestaurantList;
