const { db } = require('../../utils/db');

function findManyOrders(data) {
  return db.order.findMany({
    where: { ...data }
  });
}

function findManyOrderByCustomerId({ id, userId }) {
  return db.order.findMany({
    where: { customerId: Number(id), userId },
  });
}

function findOrderById({ id, userId }) {
  return db.order.findFirst({
    where: { id, userId },
  })
}

function createOrder({ data, userId, code }) {
  return db.order.create(
    {
      data: {
        ...data,
        userId,
        code,
        total_price: Number(data.total_price)
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
        total_price: Number(data.total_price)
      }
    }
  )
}

function deleteOrder({ data }) {
  const { id } = data
  return db.order.delete(
    {
      id
    }
  )
}

function deleteOrderByCustomerId({ customerId }) {
  return db.order.deleteMany({
    where: {
      customerId
    },
  }
  )
}

module.exports = {
  findManyOrders,
  findManyOrderByCustomerId,
  deleteOrderByCustomerId,
  createOrder,
  updateOrder,
  deleteOrder,
  findOrderById
};
