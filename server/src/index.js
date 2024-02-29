const express = require('express')
const { PrismaClient } = require('@prisma/client')
// const wildCardSearch = require('./utils/wildCardSearch')
// const sortBy = require('./utils/sortBy')
// const paginate = require('./utils/paginate')

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get('/api/customers', async (req, res) => {
  const customers = await prisma.customer.findMany()
  res.json(customers)
})


// app.post('/api/customers', async (req, res) => {
//   const body = JSON.parse(req)
//   const { pageIndex, pageSize, query } = body
//   const customers = await prisma.customer.findMany()
//   const sanitizeCustomers = customers.filter(elm => typeof elm !== 'function')
//   let data = sanitizeCustomers
//   let total = customers.length

//   if (query) {
//     data = wildCardSearch(data, query)
//     total = data.length
//   }

//   data = paginate(data, pageSize, pageIndex)

//   const responseData = {
//     data: data,
//     total: total
//   }
//   res.json(responseData)
// })



const server = app.listen(3001, () =>
  console.log(`
🚀 Server ready at: http://localhost:3001
⭐️ See sample requests: http://pris.ly/e/js/rest-express#3-using-the-rest-api`),
)
