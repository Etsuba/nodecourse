const http = require('http')
const fs = require('fs')
const path = require('path')
const fsPromise = require('fs').promises

const logEvents = require("./logEvents")

const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter()

const PORT = process.env.port || 3500;

const server = http.createServer((req,res) =>{
    console.log(req.url, req.method)

    
})

server.listen(PORT,()=>{ console.log(`server running on port ${PORT}`)})





// myEmitter.on('log' ,(msg) => logEvents(msg));

//     myEmitter.emit('log', "Log event emitted")
