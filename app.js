//  Section Two: Express CRUD API

const express = require('express');
const app = express();
const productsRouter = require('./routes/products.routes');

app.use(express.json());

app.use('/api/products', productsRouter);

module.exports = app;