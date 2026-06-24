import { prisma } from './config/prisma.js';

async function run() {
  const o = await prisma.order.findFirst({ orderBy: { createdAt: 'desc' } });
  if (o) {
    console.log("ID:", o.id);
    console.log("STATUS:", o.status);
    console.log("LIVELOCATION:", o.liveLocation);
    console.log("SHIPPING:", o.shippingAddress);
  }
}
run().finally(() => prisma.$disconnect());
