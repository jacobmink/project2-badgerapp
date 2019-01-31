const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_URI;

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.connection.on('connect', ()=>{
    console.log('MONGOOSE CONNECTED TO ', connectionString);
});

mongoose.connection.on('error', (error)=>{
    console.log('ERROR', error);
});

mongoose.connection.on('disconnect', ()=>{
    console.log('MONGOOSE DISCONNECTED FROM ', connectionString);
});