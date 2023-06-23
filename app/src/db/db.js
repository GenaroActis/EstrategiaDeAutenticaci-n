import mongoose from 'mongoose'
const connectionString = 'mongodb+srv://genaroActis:toxinfinito22@cluster0.6zafi08.mongodb.net/LoginForm?retryWrites=true&w=majority'


try {
    await mongoose.connect(connectionString);
    console.log('Conectado a la base de datos MongoDB');
} catch (error) {
    console.log(error);
}