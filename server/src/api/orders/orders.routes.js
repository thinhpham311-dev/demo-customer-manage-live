const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const {
  findManyOrders,
  findManyOrderByCustomerId,
  findOrderById,
  createOrder,
  updateOrder,
  deleteOrder
} = require('./orders.services');
const wildCardSearch = require('../../utils/wildCardSearch')
const sortBy = require('../../utils/sortBy')
const paginate = require('../../utils/paginate')
// const filterByDate = require('../../utils/filterByDate')
const { v4: uuidv4 } = require('uuid');

const router = express.Router();


// router.post('/dashboard', isAuthenticated, async (req, res, next) => {
//   try {
//     var startDate = new Date("2015-08-04");
//     var endDate = new Date("2015-08-12");
//     const { userId } = req.payload
//     const orders = await findManyOrders({ userId })
//     const sanitizeOrders = orders.map((item) => Date.parse(item.pay_date))
//     console.log(sanitizeOrders)
//     const result = await filterByDate(orders, startDate, endDate)
//     // res.json({

//     // })
//   }
//   catch (err) {
//     next(err)
//   }
// })

router.post('/list', isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.payload
    const { pageIndex, pageSize, sort, query } = req.body
    const { order, key } = sort
    const orders = await findManyOrders({ userId })
    const sanitizeOrders = orders.filter(elm => typeof elm !== 'function')
    let dataOrders = sanitizeOrders
    let total = orders.length

    if ((key === 'total_price' || key === 'products' || key === 'pay_date' || key === 'customerName') && order) {
      dataOrders.sort(sortBy(key, order === 'desc', (a) => a.toUpperCase()))
    } else {
      dataOrders.sort(sortBy(key, order === 'desc', parseInt))
    }

    if (query) {
      dataOrders = wildCardSearch(dataOrders, query)
      total = dataOrders.length
    }

    dataOrders = paginate(dataOrders, pageSize, pageIndex)

    const responseData = {
      data: dataOrders,
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
    const orderCreate = await createOrder({ data, code: uuidv4(), userId });
    res.json(orderCreate)
  } catch (err) {
    next(err)
  }
})

router.put('/update', isAuthenticated, async (req, res, next) => {
  try {
    const data = req.body;
    const { userId } = req.payload
    const orderUpdate = await updateOrder({ data, userId });
    res.json(orderUpdate)
  } catch (err) {
    next(err)
  }
})

router.delete('/delete', isAuthenticated, async (req, res, next) => {
  try {
    const data = req.body;
    const { userId } = req.payload
    const orderDelete = await deleteOrder({ data, userId });
    res.json(orderDelete)
  } catch (err) {
    next(err)
  }
})

router.post('/detail', isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.body;
    const { userId } = req.payload
    const order = await findOrderById({ id, userId });
    res.json(order)
  } catch (err) {
    next(err)
  }
})



module.exports = router;
