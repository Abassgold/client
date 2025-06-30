import mongoose from 'mongoose';

const DB_URI = process.env.NEXT_PUBLIC_MONGO_URI;

if (!DB_URI) {
  throw new Error('Please define the NEXT_PUBLIC_MONGO_URI environment variable inside .env.local');
}

let isConnected = false;

const connectDb = async () => {
  if (isConnected) {
    console.log('Already connected to database.');
    return;
  }

  if (mongoose.connection.readyState === 1) {
    console.log('Database is already connected...');
    isConnected = true;
    return;
  }

  if (mongoose.connection.readyState === 2) {
    console.log('Database is connecting...');
    return;
  }

  try {
    await mongoose.connect(DB_URI);
    isConnected = true;
    console.log('Database just connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw new Error('MongoDB connection failed.');
  }
};

export default connectDb;
