const app = require('http').createServer()
const io = module.exports.io = require('socket.io')(app)

const PORT = process.env.PORT || 3700

const socketManager = require('./socketManager')

io.connection('connection', socketManager)

app.listen(PORT, () => {
    console.log('listening in on port' + PORT)
})