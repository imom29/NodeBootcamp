const dotenv = require('dotenv')
const mongoose = require('mongoose')
const fs = require('fs')

dotenv.config({
    path : './config/config.env'
})

// Import model
const Bootcamp = require('./models/Bootcamp')

// COnnect with DB
mongoose.connect(process.env.MONGO_URI);

// Read from JSON file
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))

// Import all data function
const importData = async() =>{
    try {
        await Bootcamp.create(bootcamps);

        console.log("BOOTCAMPS IMPORTED..")
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

// Delete Data
const deleteData = async() =>{
    try {
        await Bootcamp.deleteMany();

        console.log("BOOTCAMPS Deleted..")
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

if(process.argv[2] == '-i'){
    importData();
}
else if(process.argv[2] == '-d'){
    deleteData();
}