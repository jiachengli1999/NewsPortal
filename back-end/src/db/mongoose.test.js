/* 
    Provides a function to connect to the database for Mocha tests.
    Since testing requires connecting / disconnecting from the database
    multiple times, we wrap the parameterized mongoose functions
    to make the tests easier to write
*/
const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    } catch (err) {
        return { error: err }
    }
}

function close() {
    return mongoose.disconnect()
}

module.exports = { connect, close }