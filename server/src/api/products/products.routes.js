const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const { findManyProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('./products.services');
const wildCardSearch = require('../../utils/wildCardSearch')
const sortBy = require('../../utils/sortBy')
const paginate = require('../../utils/paginate')

const router = express.Router();

router.post('/list', isAuthenticated, async (req, res, next) => {
  try {
    const { pageIndex, pageSize, sort, query } = req.body
    const { order, key } = sort
    const { userId } = req.payload
    const products = await findManyProducts({ userId })
    const sanitizeProducts = products.filter(elm => typeof elm !== 'function')
    let data = sanitizeProducts
    let total = products.length

    if ((key === 'name') && order) {
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
    const productCreate = await createProduct({ data, userId });
    res.json(productCreate)
  } catch (err) {
    next(err)
  }
})

router.put('/update', isAuthenticated, async (req, res, next) => {
  try {
    const data = req.body;
    const { userId } = req.payload
    const productUpdate = await updateProduct({ data, userId });
    res.json(productUpdate)
  } catch (err) {
    next(err)
  }
})

router.delete('/delete', isAuthenticated, async (req, res, next) => {
  try {
    const data = req.body;
    const { userId } = req.payload
    const productDelete = await deleteProduct({ data, userId });
    res.json(productDelete)
  } catch (err) {
    next(err)
  }
})


router.post('/detail', isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.body;
    const { userId } = req.payload
    const product = await findProductById({ id, userId });
    res.json(product)
  } catch (err) {
    next(err)
  }
})



module.exports = router;
