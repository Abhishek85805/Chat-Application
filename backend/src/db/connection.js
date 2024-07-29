import  mongoose from 'mongoose';

async function dbConnection(){
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/chatApplication`);
        console.log('Mongodb connected successfully');
    } catch (error) {
        console.log("Something went wrong while connecting to mongodb", error);
    }
}

export default dbConnection;
















