import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { mockProducts } from '../src/data/products.js';
import Product from './models/Product.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Product.deleteMany();

        const sampleProducts = mockProducts.map((product) => {
            // Remove the ID so Mongoose generates its own _id
            const { id, ...rest } = product;
            return { ...rest };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Product.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
