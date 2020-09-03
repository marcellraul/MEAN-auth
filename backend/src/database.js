const mongoose = require('mongoose')

async function startConnection() {
    const db = await mongoose.connect('mongodb://localhost/JWT', {
        useNewUrlParser: true,
        useUnifiedTopology: true,


    }).then(db => console.log('DataBase is Connect'))
}

exports.startConnection = startConnection