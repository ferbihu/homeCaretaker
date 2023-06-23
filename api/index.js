require('dotenv').config();
const router = require('./src/routes');
const express = require('express');

const server = express();
server.use(express.json());
server.use(router);

server.listen(process.env.PORT, ()=>{
    console.log("server running " + process.env.PORT)
})
