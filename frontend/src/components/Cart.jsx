import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, List, ListItem } from "@mui/material";

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const items = Object.values(cartItems);

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h5">Cart</Typography>
            {items.length > 0 ? (
                <List>
                    {items.map(item => (
                        <ListItem key={item.id}>
                            <Box sx={{ flex: 1 }}>
                                <Typography>{item.name} x {item.quantity}</Typography>
                            </Box>
                            <Typography>Rs. {item.price * item.quantity}</Typography>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography>No Items in the Cart.</Typography>
            )}
        </Box>
    )
}

export default Cart;