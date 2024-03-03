const bcrypt = require('bcrypt');
const { db } = require('../../utils/db');


function findManyProducts() {
  return db.product.findMany();
}

function findProductById({ id, userId }) {
  return db.product.findFirst({
    where: { id, userId },
  })
}

function createProduct({ data, userId }) {
  return db.product.create(
    {
      data: {
        ...data,
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

function deleteProduct({ data, userId }) {
  const { id } = data
  return db.product.delete(
    {
      id
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
