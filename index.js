const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 3000;
const io = require('socket.io')(server);

app.get('/', function (req, res) {

    res.send('Hello World!')
});
app.get('/me', function (req, res) {
    res.send('Hello meeeeeeeeeee!')
});

server.listen(port, function () {
   console.log(`Example app listening on port ${port}!`)
});

io.on('connection', function(client) {
    console.log(`Client ${client.id} connected...`);

    io.emit('user joined',client.id);
    client.on('join', function(data) {
        console.log(data);
    });
    client.on('disconnected', function(data) {
        console.log(`Client ${client.id} left...`);
    });

});

module.exports = app;