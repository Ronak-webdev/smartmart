import { prisma } from './config/prisma.js';

async function run() {
  const order = await prisma.order.findFirst({ orderBy: { createdAt: 'desc' } });
  if (!order) return;

  const ahmedabadLat = 23.0225;
  const ahmedabadLng = 72.5714;
  
  const truckLat = ahmedabadLat - 0.008;
  const truckLng = ahmedabadLng - 0.008;

  const newShippingAddress = {
    ...(typeof order.shippingAddress === 'object' && order.shippingAddress ? order.shippingAddress : {}),
    lat: ahmedabadLat,
    lng: ahmedabadLng,
    city: 'Ahmedabad',
    state: 'Gujarat'
  };

  await prisma.order.update({
    where: { id: order.id },
    data: {
      shippingAddress: newShippingAddress,
      liveLocation: { lat: truckLat, lng: truckLng, updatedAt: new Date().toISOString() },
    }
  });

  const userAddr = await prisma.address.findFirst({ where: { userId: order.userId } });
  if (userAddr) {
     await prisma.address.update({
       where: { id: userAddr.id },
       data: { lat: ahmedabadLat, lng: ahmedabadLng, city: 'Ahmedabad', state: 'Gujarat' }
     });
  }

  console.log("Location fixed to Ahmedabad!");
}
run().catch(console.error).finally(() => prisma.$disconnect());
