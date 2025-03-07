import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantDetails } from '../features/restaurantSlice';
import { AiOutlineInfoCircle, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { CircularProgress, Typography, Tooltip, Box, IconButton, List, ListItem } from "@mui/material";
import { getMenuItems } from "../features/menuSlice";

const MenuItems = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const restaurantDetails = useSelector((state) => state.restaurants.selectedRestaurant);
    const status = useSelector((state) => state.restaurants.status);
    const menuItems = useSelector((state) => state.menu.items);

    const [itemQuantity, setItemQuantity] = useState(
        menuItems.reduce((acc, item) => {
            acc[item.id] = 0;
            return acc
        }, {})
    )

    const [hover, setHover] = useState(false);
    useEffect(() => {
        if (id) {
            dispatch(getRestaurantDetails(id));
            dispatch(getMenuItems(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        setItemQuantity((prevQuantity) => {
            const newQuantity = { ...prevQuantity };
            menuItems.forEach((item) => {
                if (!(item.id in newQuantity)) {
                    newQuantity[item.id] = 0;
                }
            });
            return newQuantity;
        })
    }, [menuItems]);

    const handleQaunatity = (itemId, change) => {
        setItemQuantity((prevQuantity) => {
            const newQuantity = prevQuantity[itemId] + change;
            return {
                ...prevQuantity,
                [itemId]: newQuantity > 0 ? newQuantity : 0
            }
        })
    }

    { status === 'loading' && <CircularProgress /> }
    { status === 'failed' && <Typography color="error">Error Loading Menu</Typography> }
    return (
        <Box sx={{ paddingLeft: "20px" }}>
            {restaurantDetails ? (
                <Box>
                    <Box display={"flex"}>
                        <Typography variant="h4" gutterBottom>
                            {restaurantDetails.name}
                        </Typography>
                        <Box>
                            <Tooltip title={
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
                                <IconButton onMouseEnter={() => setHover(true)}
                                    onMouseLeave={() => setHover(false)}
                                    style={{ marginLeft: '8px', cursor: 'pointer' }}>
                                    <AiOutlineInfoCircle />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h6" gutterBottom>Menu</Typography>
                        {menuItems && menuItems.length > 0 ? (
                            <List>
                                {menuItems.map((item) => (
                                    <ListItem key={item.id} sx={{ borderBottom: '1px solid #ddd', padding: '8px 0' }}>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="subtitle1" fontWeight='bold'>{item.name}</Typography>
                                            <Typography variant="body2">{item.price}</Typography>
                                            <Typography variant="body2" color="textSecondary">{item.description}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                                            <IconButton onClick={() => handleQaunatity(item.id, -1)}
                                                disabled={itemQuantity[item.id] <= 0}>
                                                <AiOutlineMinus />
                                            </IconButton>
                                            <Typography variant="body2" sx={{ marginX: '8px' }}>
                                                {itemQuantity[item.id]}
                                            </Typography>
                                            <IconButton onClick={() => handleQaunatity(item.id, 1)}>
                                                <AiOutlinePlus />
                                            </IconButton>
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography>No menu items available.</Typography>
                        )}
                    </Box>
                </Box>
            ) : (
                <Typography>No restaurant details available</Typography>
            )}
        </Box>
    )
}

export default MenuItems;