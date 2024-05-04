import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import productsRoutes from './routes/products.routes.js';
import ordersRoutes from './routes/orders.routes.js';
import userRoutes from './routes/user.routes.js';
import requireAuth from './middlewares/authMiddleware.js';
import requireAdmin from './middlewares/adminMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/users', userRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.get('/api/auth', requireAdmin);

app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

// connect to MongoDB 
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message);
    });

