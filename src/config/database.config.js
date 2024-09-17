import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://leoromero:QOrVKYyuO107QJi7@backend-1.koc7tgh.mongodb.net/?retryWrites=true&w=majority&appName=backend-1', {
    dbName: 'Users'
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Connected to MongoDB");
});

export default db;