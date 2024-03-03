const express = require('express');

const auth = require('./auth/auth.routes');
const users = require('./users/users.routes');
const customers = require('./customers/customers.routes');
const products = require('./products/products.routes');
const orders = require('./orders/orders.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/auth', auth);
router.use('/users', users);
router.use('/customers', customers);
router.use('/products', products);
router.use('/orders', orders);

module.exports = router;
