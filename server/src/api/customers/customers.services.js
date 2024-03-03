const bcrypt = require('bcrypt');
const { db } = require('../../utils/db');


function findManyCustomers() {
  return db.customer.findMany();
}

function findCustomerById({ id, userId }) {
  return db.customer.findFirst({
    where: { id, userId },
  })
}

function createCustomer({ data, userId }) {
  return db.customer.create(
    {
      data: {
        ...data,
        userId
      }
    }
  )
}



function updateCustomer({ data, userId }) {
  const { id } = data
  return db.customer.update(
    {
      where: { id },
      data: {
        ...data,
        userId,
        total_order: Number(data.total_order)
      }
    }
  )
}

function deleteCustomer({ data }) {
  const { id } = data
  return db.customer.delete(
    {
      where: {
        id
      }
    }
  )
}

module.exports = {
  findManyCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  findCustomerById
};
