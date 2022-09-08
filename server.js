const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')

const bootcamps = require('./Routes/Bootcamps')
const errorHandler = require('./controllers/error')
dotenv.config({ path : './config/config.env' });

connectDB();

const PORT = process.env.PORT || 5000
const app = express();

// Body Parser
app.use(express.json());

//Middleware that logs the info about the request
//Use only in Development Mode
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use('/api/v1/bootcamps', bootcamps)

// Error Handler
app.use(errorHandler)

const server = app.listen(PORT, ()=>{console.log(`Server Running on port ${PORT} with ${process.env.NODE_ENV}`)});

// On Rejected Promise from DB
process.on('unhandledRejection', (err, promise)=>{
    console.log(`Error: ${err.message}`)
    server.close(() => process.exit(1))
})