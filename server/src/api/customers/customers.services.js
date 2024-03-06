const bcrypt = require('bcrypt');
const { db } = require('../../utils/db');


function findManyCustomers({ userId }) {
  return db.customer.findMany({
    where: { userId }
  });
}

function findCustomerById({ id, userId }) {
  return db.customer.findFirst({
    where: { id: Number(id), userId },
  })
}

function createCustomer({ data, userId }) {
  return db.customer.create(
    {
      data: {
        ...data,
        userId,
        total_order: Number(data.total_order)
      }
    }
  )
}



function updateCustomer({ data, userId }) {
  const { id } = data
  return db.customer.update(
    {
      where: { id: Number(id) },
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
        id: Number(id)
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
