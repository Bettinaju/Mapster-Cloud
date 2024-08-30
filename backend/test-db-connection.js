import mongoose from 'mongoose';
import 'dotenv/config';

const testConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to MongoDB!');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
    } finally {
        await mongoose.disconnect();
    }
};

// Handle the promise returned by testConnection
testConnection().catch((error) => {
    console.error('Unhandled error:', error.message);
});

