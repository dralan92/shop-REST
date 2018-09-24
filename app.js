const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
//const cors = require('cors');


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');


mongoose.connect('mongodb+srv://dralan:dralan@cluster0-ppzmx.mongodb.net/test?retryWrites=true',
                    {useMongoClient:true});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//app.use(cors());
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    });
})
module.exports = app;