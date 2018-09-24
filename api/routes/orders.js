const express = require('express');
const router = express.Router();

router.get('/', (req,res,next)=>{
    res.status(200).json({
        message : 'order was fetched'
    });
});

router.post('/', (req,res,next)=>{
    res.status(201).json({
        message : 'order was created'
    });
});

router.get('/:orderId', (req,res,next)=>{
    const id = req.params.orderId;

    res.status(200).json({
        message : 'U passed an Id',
        id : id
    });
});
module.exports = router;