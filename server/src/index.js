const express = require('express')
const { PrismaClient } = require('@prisma/client')
const wildCardSearch = require('./utils/wildCardSearch')
const sortBy = require('./utils/sortBy')
const paginate = require('./utils/paginate')

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

// app.get('/api/customers', async (req, res) => {
//   const customers = await prisma.customer.findMany()
//   res.json(customers)
// })

app.post('/api/customers', async (req, res) => {
  const { pageIndex, pageSize, sort, query } = req.body
  const { order, key } = sort
  const customers = await prisma.customer.findMany()
  const sanitizeCustomers = customers.filter(elm => typeof elm !== 'function')
  let data = sanitizeCustomers
  let total = customers.length

  if ((key === 'name' || key === 'product' || key === 'email' || key === 'total_order') && order) {
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
  // console.log(responseData, pageIndex, pageSize, query)

  res.json(responseData)
})

app.post('/api/customer/create', async (req, res) => {
  const data = req.body
  const customerAdd = await prisma.customer.create({ data })
  res.json(customerAdd)
})

app.delete(`/api/customer/:id`, async (req, res) => {
  const { id } = req.params
  const customerDelete = await prisma.customer.delete({
    where: {
      id: Number(id),
    },
  })
  res.json(customerDelete)
})

app.get(`/api/customer/:id`, async (req, res) => {
  const { id } = req.params

  const customer = await prisma.customer.findUnique({
    where: { id: Number(id) },
  })
  res.json(customer)
})

app.put(`/api/customer/:id`, async (req, res) => {
  const data = req.body
  const { id } = req.params

  try {
    const customer = await prisma.customer.update({
      where: { id: Number(id) },
      data
    })

    res.json(customer)
  } catch (error) {
    res.json({ error: `Customer with ID does not exist in the database` })
  }
})

const server = app.listen(3001, () =>
  console.log(`
🚀 Server ready at: http://localhost:3001
⭐️ See sample requests: http://pris.ly/e/js/rest-express#3-using-the-rest-api`),
)
