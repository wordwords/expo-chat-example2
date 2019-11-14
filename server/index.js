const express = require('express');
const app = express();

const server = require('http').createServer(app);
const sockt = require('socket.io').listen(server);

const PORT = 3000;


/**
 * connect the client
 * send back emited text
 * every resievd mssg print on console
 */

sockt.on('connection', socket =>{

    console.log('user connected');

    socket.on('massage',messg =>{
        sockt.emit('massage',"[Server -> Client]  : "+messg);
        console.log(messg);
    });
    
});

/**
 * server listing method
 * port ${3000}
 */

server.listen(PORT , ()=>{

    console.log(`server running ${PORT}`);
});