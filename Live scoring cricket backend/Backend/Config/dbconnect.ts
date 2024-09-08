import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/Cricket';

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Cricket");

    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};


export default dbConnect;
