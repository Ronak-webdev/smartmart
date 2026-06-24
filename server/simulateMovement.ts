import { prisma } from './config/prisma.js';

async function simulate() {
  const order = await prisma.order.findFirst({ orderBy: { createdAt: 'desc' } });
  if (!order || !order.liveLocation) {
    console.log("No order or live location found");
    return;
  }

  const addr: any = order.shippingAddress;
  const targetLat = addr.lat || 19.0760;
  const targetLng = addr.lng || 72.8777;

  let currentLoc: any = order.liveLocation;
  let lat = currentLoc.lat;
  let lng = currentLoc.lng;

  console.log(`Starting movement from ${lat}, ${lng} to ${targetLat}, ${targetLng}`);

  const steps = 20;
  const latStep = (targetLat - lat) / steps;
  const lngStep = (targetLng - lng) / steps;

  for (let i = 0; i < steps; i++) {
    lat += latStep;
    lng += lngStep;
    
    // Add a tiny bit of random jitter for realism
    const jitterLat = lat + (Math.random() - 0.5) * 0.0005;
    const jitterLng = lng + (Math.random() - 0.5) * 0.0005;

    await prisma.order.update({
      where: { id: order.id },
      data: {
        liveLocation: { lat: jitterLat, lng: jitterLng, updatedAt: new Date().toISOString() }
      }
    });

    console.log(`Moved to ${jitterLat}, ${jitterLng}`);
    // Wait 4 seconds between movements
    await new Promise(r => setTimeout(r, 4000));
  }

  console.log("Arrived!");
}

simulate().catch(console.error).finally(() => prisma.$disconnect());
