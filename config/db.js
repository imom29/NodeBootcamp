const mongoose = require('mongoose')

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        // UseNewUrlParser : true,
        // UseCreateIndex : true,
        // UseFindAndModify : false
    })

    console.log(`Connection With Mongo DB successful at ${conn.connection.host}`)
}

module.exports = connectDB;