import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { inngest } from "../inngest/index.js";
import Razorpay from "razorpay";
import crypto from "crypto";

// Create order
// POST /api/orders
export const createOrder = async (req: Request, res: Response) => {
    const { items, shippingAddress, paymentMethod } = req.body;

    // Check if order items are empty
    if (!items || items.length === 0) {
        return res.status(400).json({ message: "No order items" });
    }

    // Look up actual prices from the database
    const productIds = items.map((i: any) => i.product);
    const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
    const productMap: Record<string, (typeof products)[0]> = {};

    products.forEach((p: any) => (productMap[p.id] = p));

    // Check if product is in stock
    for (const item of items) {
        const product = productMap[item.product];
        if (!product || (product.stock ?? 0) < item.quantity) {
            return res.status(404).json({ message: "Product out of stock" });
        }
    }

    const orderItems = items.map((item: any) => {
        const dbProduct = productMap[item.product];
        if (!dbProduct) throw new Error(`Product ${item.product} not found`);
        return {
            product: dbProduct.id,
            name: dbProduct.name,
            image: dbProduct.image,
            price: dbProduct.price,
            quantity: item.quantity,
            unit: dbProduct.unit,
        };
    });

    const subtotal = orderItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
    const deliveryFee = subtotal > 20 ? 0 : 1.99;
    const tax = Math.round(subtotal * 0.08 * 100) / 100;
    const total = Math.round((subtotal + deliveryFee + tax) * 100) / 100;

    const order = await prisma.order.create({
        data: {
            userId: req.user!.id,
            items: orderItems,
            shippingAddress,
            paymentMethod,
            subtotal,
            deliveryFee,
            tax,
            total,
            statusHistory: [{ status: "Placed", note: "Order placed successfully", timestamp: new Date() }],
        },
    });

    if (paymentMethod === "dev_bypass" && process.env.NODE_ENV !== "production") {
        const paidOrder = await prisma.order.update({
            where: { id: order.id },
            data: { isPaid: true, paymentMethod: "dev_bypass" },
        });

        for (const item of orderItems) {
            await prisma.product.update({
                where: { id: item.product },
                data: { stock: { decrement: item.quantity } },
            });
            await inngest.send({ name: "inventory/stock.updated", data: { productId: item.product } }).catch(e => console.error("Inngest error:", e.message));
        }
        await inngest.send({ name: "order/placed", data: { orderId: order.id } }).catch(e => console.error("Inngest error:", e.message));
        
        return res.json({ order: paidOrder });
    }

    if (paymentMethod === "card") {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
            key_secret: process.env.RAZORPAY_KEY_SECRET || "rzp_secret_placeholder",
        });

        try {
            const rzpOrder = await razorpay.orders.create({
                amount: Math.round(total * 100),
                currency: "INR",
                receipt: `receipt_${order.id}`,
            });

            return res.json({ 
                razorpayOrderId: rzpOrder.id,
                amount: Math.round(total * 100),
                currency: "INR",
                orderId: order.id
            });
        } catch (error: any) {
            return res.status(500).json({ message: "Failed to create Razorpay order", error: error.message });
        }
    }

    res.json({ order });

    // Decrease stock
    for (const item of orderItems) {
        await prisma.product.update({
            where: { id: item.product },
            data: { stock: { decrement: item.quantity } },
        });
    }

    // Send stock update events for each product in the order
    for (const item of orderItems) {
        await inngest.send({ name: "inventory/stock.updated", data: { productId: item.product } }).catch(e => console.error("Inngest error:", e.message));
    }

    await inngest.send({ name: "order/placed", data: { orderId: order.id } }).catch(e => console.error("Inngest error:", e.message));
};

// Get user's orders
// GET /api/orders
export const getUserOrders = async (req: Request, res: Response) => {
    const { status } = req.query;

    const where: any = {
        userId: req.user!.id,
        NOT: [{ paymentMethod: "card", isPaid: false }],
    };

    if (status && status !== "all") {
        where.status = status;
    }

    const orders = await prisma.order.findMany({
        where,
        include: { deliveryPartner: { select: { name: true, phone: true } } },
        orderBy: { createdAt: "desc" },
    });

    res.json({ orders });
};

// Get single order
// GET /api/orders/:id
export const getOrder = async (req: Request, res: Response) => {
    const order = await prisma.order.findFirst({
        where: { id: req.params.id as string, userId: req.user!.id },
        include: { deliveryPartner: { select: { name: true, phone: true, avatar: true, vehicleType: true } } },
    });

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }
    res.json({ order });
};

// Update order status (admin)
// PUT /api/orders/:id/status
export const updateOrderStatus = async (req: Request, res: Response) => {
    const { status, note } = req.body;
    const order = await prisma.order.findUnique({ where: { id: req.params.id as string } });

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    const history = (Array.isArray(order.statusHistory) ? order.statusHistory : []) as any[];
    history.push({ status, note: note || `Order ${status.toLowerCase()}`, timestamp: new Date() });

    const updatedOrder = await prisma.order.update({
        where: { id: req.params.id as string },
        data: { status, statusHistory: history },
    });

    res.json({ order: updatedOrder });
};

// Get all orders (admin)
// GET /api/orders/all
export const getAllOrders = async (req: Request, res: Response) => {
    const orders = await prisma.order.findMany({
        where: { NOT: [{ paymentMethod: "card", isPaid: false }] },
        include: {
            user: { select: { name: true, email: true } },
            deliveryPartner: { select: { name: true, phone: true, email: true } },
        },
        orderBy: { createdAt: "desc" },
    });

    res.json({ orders });
};

// Get Order Location
// GET /api/orders/:id/location
export const getOrderLocation = async (req: Request, res: Response) => {
    const order = await prisma.order.findFirst({
        where: { id: req.params.id as string, userId: req.user!.id },
        select: { liveLocation: true, status: true },
    });

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ liveLocation: order.liveLocation, status: order.status });
};

// Verify Razorpay Payment
// POST /api/orders/verify
export const verifyRazorpayPayment = async (req: Request, res: Response) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
    
    const secret = process.env.RAZORPAY_KEY_SECRET || "rzp_secret_placeholder";

    const generated_signature = crypto
        .createHmac('sha256', secret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest('hex');

    if (generated_signature === razorpay_signature) {
        try {
            const paidOrder = await prisma.order.update({
                where: { id: orderId },
                data: { isPaid: true },
            });

            const orderItems = Array.isArray(paidOrder.items) ? paidOrder.items : ([] as any[]);

            for (const item of orderItems) {
                await prisma.product.update({
                    where: { id: item.product },
                    data: { stock: { decrement: item.quantity } },
                });
                await inngest.send({ name: "inventory/stock.updated", data: { productId: item.product } }).catch(e => console.error("Inngest error:", e.message));
            }

            await inngest.send({ name: "order/placed", data: { orderId } }).catch(e => console.error("Inngest error:", e.message));

            return res.json({ success: true, message: "Payment verified successfully" });
        } catch (err: any) {
            return res.status(500).json({ success: false, message: "Error updating order" });
        }
    } else {
        return res.status(400).json({ success: false, message: "Invalid signature" });
    }
};
