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

    client.on('join', function(data) {
        console.log('client',data);
        io.emit('join',{hello: 'world'})
    });

    client.on('disconnected', function(data) {

    });

    client.on('message', function(data) {
        io.emit('message',data)
    });

});

module.exports = app;