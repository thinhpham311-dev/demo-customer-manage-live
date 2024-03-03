const { db } = require('../../utils/db');

function findManyOrders() {
  return db.order.findMany();
}

function findOrderById({ id, userId }) {
  return db.order.findFirst({
    where: { id, userId },
  })
}

function createOrder({ data, userId }) {
  return db.order.create(
    {
      data: {
        ...data,
        userId
      }
    }
  )
}

function updateOrder({ data, userId }) {
  const { id } = data
  return db.order.update(
    {
      where: { id },
      data: {
        ...data,
        userId,
      }
    }
  )
}

function deleteOrder({ data, userId }) {
  const { id } = data
  return db.order.delete(
    {
      id
    }
  )
}

module.exports = {
  findManyOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  findOrderById
};
