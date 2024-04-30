import Cart from "../models/cart.js";

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('products.product');
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const addToCart = async (req, res) => {
    const { product, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
        const productIndex = cart.products.findIndex(p => p.product == product);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product, quantity });
        }
        await cart.save();
        res.status(201).json(cart);
    } else {
        const newCart = new Cart({
            user: req.user._id,
            products: [{ product, quantity }]
        });
        await newCart.save();
        res.status(201).json(newCart);
    }
}

export const removeFromCart = async (req, res) => {
    const { product } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
        const productIndex = cart.products.findIndex(p => p.product == product);
        if (productIndex !== -1) {
            cart.products.splice(productIndex, 1);
            await cart.save();
            res.status(200).json(cart);
        } else {
            res.status(404).send('Product not found in cart');
        }
    } else {
        res.status(404).send('Cart not found');
    }

}
