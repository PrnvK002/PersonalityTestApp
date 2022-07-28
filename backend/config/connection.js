import mongoose from 'mongoose';

const connectDB = async () => {
    try{

        const conn = await mongoose.connect('mongodb+srv://user123:accessdata@blogs.ej6tx.mongodb.net/PersonalityTest?retryWrites=true&w=majority');
        console.log(`Successfully connected ${conn}`);

    }catch(err){
        console.log(err);
        console.log(`MongoError : ${err}`);
    }
}

export default connectDB;