import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurants } from '../features/restaurantSlice';
import '../css/restaurantList.css';
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
    <div className='restaurant-list'>
      <h1>Restaurant List</h1>
      {/* {isAdmin && (
        <button onClick={handleAddRestaurant} className='add-restaurant'>
          Add Restaurant
        </button>
      )} */}
      {status === 'loading' && <p>Loading Restaurants...</p>}
      {status === 'failed' && <p>Error Loading Restaurants...</p>}

      {/* Restaurant List */}
      <div className="restaurant-items">
        {Array.isArray(restaurants) && restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <div key={restaurant.id} className="restaurant-item" onClick={() => handleRestaurantClick(restaurant.id)}>
              <h3>{restaurant.name}</h3>
              <p>{restaurant.address}</p>
              <p>{restaurant.cuisine}</p>
            </div>
          ))
        ) : (
          <p>No restaurants available</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantList;
