const express = require('express')
const { PrismaClient } = require('@prisma/client')
const wildCardSearch = require('./utils/wildCardSearch')
const sortBy = require('./utils/sortBy')
const paginate = require('./utils/paginate')
const bodyParser = require('body-parser');
const cors = require('cors');

const prisma = new PrismaClient()
const app = express()
app.use(cors());

app.use(express.json())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
  res.json(responseData)
})

app.post('/api/customer/create', async (req, res) => {
  const data = req.body
  console.log(data)
  await prisma.customer.create({
    data: {
      ...data,
      total_order: Number(data.total_order)
    }
  })
  res.json(true)
})

app.delete(`/api/customer/:id`, async (req, res) => {
  const { id } = req.params
  try {
    await prisma.customer.delete({
      where: {
        id: Number(id),
      },
    })
    res.json(true)
  } catch (error) {
    res.json({ error: `ID Customer does not exist in the database` })
  }
})

app.get(`/api/customer/:id`, async (req, res) => {
  const { id } = req.params
  console.log(id)
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: Number(id) },
    })
    res.json(customer)
  } catch (error) {
    res.json({ error: `Customer with ID does not exist in the database` })
  }
})

app.put(`/api/customer/:id`, async (req, res) => {
  const data = req.body
  const { id } = req.params
  try {
    await prisma.customer.update({
      where: { id: Number(id) },
      data: {
        ...data,
        total_order: Number(data.total_order)
      }
    })

    res.json(true)
  } catch (error) {
    res.json({ error: `Customer with ID does not exist in the database` })
  }
})

const server = app.listen(3001, () =>
  console.log(`
🚀 Server ready at: http://localhost:3001
⭐️ See sample requests: http://pris.ly/e/js/rest-express#3-using-the-rest-api`),
)
