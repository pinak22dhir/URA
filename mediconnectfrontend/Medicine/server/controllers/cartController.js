import userModel from '../models/userModel.js';

// Add products to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Validate inputs
        if (!userId || !itemId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        let cartData = userData.cartData || {};

        // Update cartData with the new item
        if (cartData[itemId]) {
            cartData[itemId] += 1; // Increment quantity
        } else {
            cartData[itemId] = 1; // Add new item with quantity 1
        }

        // Update the user's cart data in the database
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.status(200).json({ message: "Item added to cart successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, quantity } = req.body;

        // Validate inputs
        if (!userId || !itemId || quantity === undefined) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        let cartData = userData.cartData || {};

        // Update the item's quantity in the cart
        if (cartData[itemId]) {
            if (quantity > 0) {
                cartData[itemId] = quantity; // Update quantity
            } else {
                delete cartData[itemId]; // Remove item if quantity is 0
            }
        } else {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        // Update the user's cart data in the database
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.status(200).json({ message: "Cart updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get cart
const getCart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Validate input
        if (!userId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const cartData = userData.cartData || {};
        res.status(200).json({ cartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export { addToCart, updateCart, getCart };
