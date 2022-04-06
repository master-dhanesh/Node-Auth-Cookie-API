// create mongoose connection
const mongoose = require('mongoose');

exports.connectdatabase = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));
}
