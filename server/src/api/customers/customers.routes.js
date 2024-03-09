const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const { findManyCustomers, createCustomer, updateCustomer, findCustomerById, deleteCustomer } = require('./customers.services');
const { deleteOrderByCustomerId } = require('../orders/orders.services')
const wildCardSearch = require('../../utils/wildCardSearch')
const sortBy = require('../../utils/sortBy')
const paginate = require('../../utils/paginate')

const router = express.Router();


router.post('/list', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload
    const { pageIndex, pageSize, sort, query } = req.body
    const { order, key } = sort
    const customers = await findManyCustomers({ userId })
    const sanitizeCustomers = customers.filter(elm => typeof elm !== 'function')
    let data = sanitizeCustomers
    let total = customers.length

    if ((key === 'name' || key === 'email') && order) {
      data.sort(sortBy(key, order === 'desc', (a) => a.toUpperCase()))
    } else {
      data.sort(sortBy(key, order === 'desc', parseInt))
    }

    if (query) {
      data = wildCardSearch(data, query)
      total = data.length
    }

    data = paginate(data, pageSize, pageIndex)

    const responseData = {
      data: data,
      total: total
    }

    res.json(responseData);
  } catch (err) {
    next(err);
  }
});

router.post('/create', isAuthenticated, async (req, res, next) => {
  try {
    const data = req.body;
    const { userId } = req.payload
    const customerCreate = await createCustomer({ data, userId });
    res.json(customerCreate)
  } catch (err) {
    next(err)
  }
})

router.put('/update', isAuthenticated, async (req, res, next) => {
  try {
    const data = req.body;
    const { userId } = req.payload
    const customerUpdate = await updateCustomer({ data, userId });
    res.json(customerUpdate)
  } catch (err) {
    next(err)
  }
})

router.delete('/delete', isAuthenticated, async (req, res, next) => {
  try {
    const data = req.body;
    const customerDelete = await deleteCustomer({ data });
    const customerDeleteByCustomerId = await deleteOrderByCustomerId({ customerId: data.id })
    res.json({ customerDelete, customerDeleteByCustomerId })
  } catch (err) {
    next(err)
  }
})

router.post('/detail', isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.body;
    const { userId } = req.payload
    const customer = await findCustomerById({ id, userId });
    res.json(customer)
  } catch (err) {
    next(err)
  }
})



module.exports = router;
