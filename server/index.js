import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import productsRoutes from './routes/products.routes.js';
import ordersRoutes from './routes/orders.routes.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

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

let viewerCount = 0;

io.on('connection', (socket) => {
    console.log('A user connected');
    viewerCount++;
    io.emit('viewerCount', viewerCount);

    socket.on('disconnect', () => {
        console.log('User disconnected');
        viewerCount--;
        io.emit('viewerCount', viewerCount);
    });
});

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
