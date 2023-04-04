const connectToMongo = require("./db")
const express = require('express')

connectToMongo();

const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/about', (req, res) => {
    res.send('About')
})

app.use(express.json())

// The app.use() method mounts or puts the specified middleware functions at the specified path. | app.use([path], callback, [callback])
// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// req is an object containing information about the HTTP request that raised the event. In response to req, you use res to send back the desired HTTP response.
