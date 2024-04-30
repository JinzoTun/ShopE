import Order from '../models/order.js';

export const createOrder = async (req, res) => {
    try {
        const { name, email, address, total, cartItems } = req.body;
        if (!name || !email || !address || !total || !cartItems) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const order = new Order({
            name,
            email,
            address,
            total,
            cartItems,
        });
        await order.save();
        res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: 'Failed to create order. Please try again later.' });
    }
}


export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

// Update order 
export const updateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.status = req.body.status || order.status;
        await order.save();
        res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
        console.error("Error updating order:", error);
    }

}

export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.deleteOne();
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
        console.error("Error deleting order:", error);
    }
}



