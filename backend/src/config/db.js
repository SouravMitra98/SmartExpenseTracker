import mongoose from 'mongoose'

export const conDB = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongDB Connected');
}