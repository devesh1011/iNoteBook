const mongoose = require('mongoose')

const mongoURI = 'mongodb://127.0.0.1:27017/Backend?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'

const connectToMongo = () => {
    mongoose.connect(mongoURI, {serverSelectionTimeoutMS: 300000}, console.log("Connected to Mongo successfully"))
}    

module.exports = connectToMongo;