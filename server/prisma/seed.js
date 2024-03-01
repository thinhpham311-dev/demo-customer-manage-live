const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const customerData = [
  {
    name: 'Alice',
    product: 'product A',
    email: 'alice@prisma.io',
    id_client: 'abc',
    active: 'abc',
    total_order: 12000
  },
  {
    name: 'Peter',
    product: 'product B',
    email: 'peter@prisma.io',
    id_client: 'abc',
    active: 'abc',
    total_order: 12000
  },
  {
    name: 'Daniel',
    product: 'product C',
    email: 'daniel@prisma.io',
    id_client: 'abc',
    active: 'abc',
    total_order: 12000
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of customerData) {
    const customer = await prisma.customer.create({
      data: u,
    })
    console.log(`Created user with id: ${customer.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
