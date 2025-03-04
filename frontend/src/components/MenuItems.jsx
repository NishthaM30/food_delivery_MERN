import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantDetails } from '../features/restaurantSlice';
import { AiOutlineInfoCircle } from "react-icons/ai";
import '../css/restaurantList.css';
import { getMenuItems } from "../features/menuSlice";

const MenuItems = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const restaurantDetails = useSelector((state) => state.restaurants.selectedRestaurant);
    const status = useSelector((state) => state.restaurants.status);
    const error = useSelector((state) => state.restaurants.error);
    const menuItems = useSelector((state) => state.menu.items);

    const [hover, setHover] = useState(false);
    useEffect(() => {
        if (id) {
            dispatch(getRestaurantDetails(id)); // Fetch restaurant details
            dispatch(getMenuItems(id)); // Fetch menu items for the restaurant
        }
    }, [id, dispatch]);
    
    if (status === 'loading') {
        return <p>Loading Menu Items...</p>;
    }

    if (status === 'failed') {
        return <p>Error: {error}</p>;
    }
    return (
        <div className="restaurant-details">
            {restaurantDetails ? (
                <div>
                    <div className="restaurant-header">
                        <h2>{restaurantDetails.name}</h2>
                        <div className="icon-container"
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}>
                            <AiOutlineInfoCircle style={{ marginLeft: '8px', cursor: 'pointer' }} />
                            {hover && (
                                <div className="details-box">
                                    <p><strong>Address:</strong> {restaurantDetails.address}</p>
                                    <p><strong>Cuisine:</strong> {restaurantDetails.cuisine}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <h3>Menu</h3>
                        {menuItems && menuItems.length > 0 ? (
                            <ul className="menu-list">
                                {menuItems.map(item => (
                                    <li key={item.id} className="menu-item">
                                        <p><strong>{item.name}</strong></p>
                                        <p>{item.description}</p>
                                        <p><strong>Price:</strong> ${item.price}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No menu items available.</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>No restaurant details available</p>
            )}
        </div>
    )
}

export default MenuItems;