const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Order = require('../models/orders');

router.get('/', (req,res,next)=>{
   Order.find().exec()
   .then(docs=>{
       res.status(200).json(docs);
   })
   .catch(err=>{
       res.status(500).json({
           error : err
       })
   });
});

router.post('/', (req,res,next)=>{
  const order = new Order({
      _id : mongoose.Types.ObjectId(), 
      quantity : req.body.quantity,
      product : req.body.productId

  });
  order.save()
  .then( result=>{
      console.log(result);
      res.status(201).json(result);
  })
  .catch(err=> {
      console.log(err);
      res.status(500).json({
          error : err
      });
  });
    res.status(201).json({
        message : 'order was created',
        order : order
    });
});

router.get('/:orderId', (req,res,next)=>{
    const id = req.params.orderId;

    res.status(200).json({
        message : ' Id',
        id : id
    });
});

router.delete('/:orderId', (req, res, next )=>{
    Order.remove({_id : req.params.orderId})
    .exec()
    .then(result =>{
        res.status(200).json({
            message : 'order deleted',
            
        })
    })
    .catch(err=>{
        res.status(500).json({
            error : err
        })
    });
});
module.exports = router;