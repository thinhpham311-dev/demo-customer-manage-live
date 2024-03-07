const bcrypt = require('bcrypt');
const { db } = require('../../utils/db');


function findManyProducts({ userId }) {
  return db.product.findMany({
    where: {
      userId
    }
  });
}

function findProductById({ id, userId }) {
  console.log(id)
  return db.product.findFirst({
    where: {
      id: Number(id),
      userId
    },
  })
}

function createProduct({ data, userId }) {
  return db.product.create(
    {
      data: {
        ...data,
        price: Number(data.price),
        userId
      }
    }
  )
}

function updateProduct({ data, userId }) {
  const { id } = data
  return db.product.update(
    {
      where: { id },
      data: {
        ...data,
        userId,
      }
    }
  )
}

function deleteProduct({ data }) {
  const { id } = data
  return db.product.delete(
    {
      where: { id: Number(id) }
    }
  )
}

module.exports = {
  findManyProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  findProductById
};
