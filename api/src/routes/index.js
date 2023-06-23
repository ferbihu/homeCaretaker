const express = require('express');
const carevigerRouter = require('./careviger');

const router = express.Router();

router.get('/health', (req,res) =>{
    console.log("todo ok");
    res.status(200).send('server running');
});

router.use('/careviger', carevigerRouter);


module.exports =  router;