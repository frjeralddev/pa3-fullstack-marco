import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/pa3_tareas';
        await mongoose.connect(uri);
        console.log('Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
        process.exit(1);
    }
};