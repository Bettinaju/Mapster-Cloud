import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import authRouter from './controllers/auth.js';
import locationsRouter from './controllers/locations.js';
import errorHandler from './utils/errorHandler.js';

const app = express();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if the database connection fails
  }
};

connectToDatabase();

// Determine the directory name from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "public" directory
app.use(express.static(path.join(process.cwd(), 'public')));

// Default route to serve your main HTML file
app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Invoke middleware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// Invoke routers
app.use('/users', authRouter);
app.use('/nonsusloc', locationsRouter);

// Use custom error handler
app.use(errorHandler);

export default app;
