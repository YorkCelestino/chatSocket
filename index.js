
const express = require('express');
const path = require('path');
const app = express();


// configuraciones
app.set('port', process.env.PORT || 3000);

// archivos estaticos

app.use(express.static(path.join(__dirname, 'public')))

// iniciando el server
const server = app.listen(app.get('port'), ()=>{
    console.log('servidor en el puerto', app.get('port'));
});


// webSocket

const SocketIO = require('socket.io');
const IO = SocketIO(server);


IO.on('connection',(socket)=>{
    console.log('nueva coneccion', socket.id);
    socket.on('chat:message',(data)=>{
        IO.sockets.emit('chat:message', data)
    })

    socket.on('chat:typing',(data)=>{
        socket.broadcast.emit('chat:typing', data)
    })
    
})
