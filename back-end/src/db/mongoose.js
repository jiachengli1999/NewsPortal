const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
})

mongoose.connection.on('connected', () => {
   console.log('Mongoose default connection open to: ' + process.env.MONGODB_URL)
})

mongoose.connection.on('error', (err) => {
   console.log('Mongoose default connection error' + err)
})

module.exports = mongoose