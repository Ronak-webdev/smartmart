import { prisma } from './config/prisma.js';

async function run() {
  const order = await prisma.order.findFirst({ orderBy: { createdAt: 'desc' } });
  if (!order) {
    console.log("No order found");
    return;
  }
  
  // Create mock rider if none exists
  let rider = await prisma.deliveryPartner.findFirst();
  if (!rider) {
    rider = await prisma.deliveryPartner.create({
       data: { name: 'Ramesh Singh', email: 'ramesh@smartmart.com', password: '123', phone: '9876543210', vehicleType: 'bike' }
    });
  }

  const addr: any = order.shippingAddress;
  let lat = addr.lat || 19.0760;
  let lng = addr.lng || 72.8777;

  // offset slightly
  lat -= 0.005;
  lng -= 0.005;

  const history = Array.isArray(order.statusHistory) ? order.statusHistory : [];

  await prisma.order.update({
    where: { id: order.id },
    data: {
      status: 'Out for Delivery',
      deliveryPartnerId: rider.id,
      liveLocation: { lat, lng, updatedAt: new Date().toISOString() },
      statusHistory: [
         ...history,
         { status: 'Out for Delivery', note: 'Mock delivery started', timestamp: new Date() }
      ]
    }
  });
  console.log("Order updated! Status is now Out for Delivery with a mock location.");
}
run().catch(console.error).finally(() => prisma.$disconnect());
