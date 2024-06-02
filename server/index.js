import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http'; // Import http module
import { Server } from 'socket.io'; // Import Server from socket.io
import productsRoutes from './routes/products.routes.js';
import ordersRoutes from './routes/orders.routes.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const server = http.createServer(app); // Create http server
const io = new Server(server); // Create socket.io instance

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
app.use('/api/auth', authRoutes);

app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Connect WebSocket.io
io.on('connection', (socket) => {
    console.log('A user connected');

    // Example: emit viewer count every 5 seconds
    setInterval(() => {
        const viewerCount = Math.floor(Math.random() * 100); // Example viewer count, replace with your logic
        socket.emit('viewerCount', viewerCount);
    }, 5000);

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// connect to MongoDB 
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message);
    });
