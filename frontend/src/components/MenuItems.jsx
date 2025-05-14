import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantDetails } from '../features/restaurantSlice';
import { AiOutlineInfoCircle, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { CircularProgress, Typography, Tooltip, Box, IconButton, List, ListItem, Button } from "@mui/material";
import { getMenuItems } from "../features/menuSlice";
import { addToCart, removeFromCart } from "../features/cartSlice";

const MenuItems = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const restaurantDetails = useSelector((state) => state.restaurants.selectedRestaurant);
    const status = useSelector((state) => state.restaurants.status);
    const menuItems = useSelector((state) => state.menu.items);
    const cartItems = useSelector((state) => state.cart.items);

    const [hover, setHover] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(getRestaurantDetails(id));
            dispatch(getMenuItems(id));
        }
    }, [id, dispatch]);

    const handleViewCart = ()=>{
        navigate('/cart')
    }
    const handleQuantityChange = (item, change) => {
        if (change === 1) dispatch(addToCart(item));
        else if (change === -1) dispatch(removeFromCart(item.id));
    }
    const getItemQuantity = (itemId) => cartItems[itemId]?.quantity || 0;
    const totalCount = Object.values(cartItems).reduce((sum, item) => sum + item.quantity, 0);

    if (status === 'loading') return <CircularProgress />;
    if (status === 'failed') return <Typography color="error">Error Loading Menu</Typography>

    return (
        <Box sx={{ paddingLeft: "20px", paddingRight: "20px" }}>
            {restaurantDetails ? (
                <Box>
                    <Box display={"flex"} alignItems="center">
                        <Typography variant="h4" gutterBottom>
                            {restaurantDetails.name}
                        </Typography>
                        <Tooltip
                            title={
                                <Box>
                                    <Typography><strong>Address:</strong> {restaurantDetails.address}</Typography>
                                    <Typography><strong>Cuisine:</strong> {restaurantDetails.cuisine}</Typography>
                                </Box>
                            }
                            arrow
                            open={hover}
                            onClose={() => setHover(false)}
                            onOpen={() => setHover(true)}
                        >
                            <IconButton
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
                                style={{ marginLeft: '8px', cursor: 'pointer' }}
                            >
                                <AiOutlineInfoCircle />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Box>
                        <Typography variant="h6" gutterBottom>Menu</Typography>
                        {menuItems && menuItems.length > 0 ? (
                            <List>
                                {menuItems.map((item) => (
                                    <ListItem key={item.id} sx={{ borderBottom: '1px solid #ddd', padding: '8px 0' }}>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="subtitle1" fontWeight='bold'>{item.name}</Typography>
                                            <Typography variant="body2">Rs. {item.price}</Typography>
                                            <Typography variant="body2" color="textSecondary">{item.description}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                                            <IconButton
                                                onClick={() => handleQuantityChange(item, -1)}
                                                disabled={getItemQuantity(item.id) <= 0}
                                            >
                                                <AiOutlineMinus />
                                            </IconButton>
                                            <Typography variant="body2" sx={{ marginX: '8px' }}>
                                                {getItemQuantity(item.id)}
                                            </Typography>
                                            <IconButton onClick={() => handleQuantityChange(item, 1)}>
                                                <AiOutlinePlus />
                                            </IconButton>
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography>No menu items available.</Typography>
                        )}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <Typography variant="h6" sx={{ marginTop: '16px' }}>
                                Total Items in Cart: {totalCount}
                            </Typography>
                            {totalCount > 0 &&(
                                <Button variant="contained" color="primary" onClick={handleViewCart}>
                                    View Cart
                                </Button>
                            )}
                        </Box>

                    </Box>
                </Box>
            ) : (
                <Typography>No restaurant details available</Typography>
            )}
        </Box>
    )
}

export default MenuItems;