import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { IOrder, IOrderItem } from "@/types";
import { generateOrderNumber } from "@/lib/utils";

export async function createOrder(data: {
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: IOrderItem[];
  shippingAddress: {
    street: string;
    area: string;
    city: string;
    pincode: string;
    landmark?: string;
  };
  paymentMethod: "COD" | "UPI";
  discount?: number;
  deliveryCharge?: number;
  notes?: string;
}): Promise<IOrder> {
  await connectToDatabase();

  // Validate prices from MongoDB database records (never trust client prices)
  let subtotal = 0;
  const verifiedItems: IOrderItem[] = [];

  for (const item of data.items) {
    const dbProduct = await Product.findById(item.productId);
    if (!dbProduct) {
      throw new Error(`Product not found with ID: ${item.productId}`);
    }

    const price = dbProduct.price;
    subtotal += price * item.quantity;

    verifiedItems.push({
      productId: item.productId,
      name: dbProduct.name,
      slug: dbProduct.slug,
      price: price,
      quantity: item.quantity,
      color: item.color,
      variant: item.variant,
      image: item.image || dbProduct.thumbnail,
    });
  }

  const discount = data.discount || 0;
  const deliveryCharge = data.deliveryCharge || 0;
  const total = Math.max(0, subtotal - discount + deliveryCharge);
  const orderNumber = generateOrderNumber();

  const newOrder = await Order.create({
    orderNumber,
    userId: data.userId,
    customerName: data.customerName,
    customerEmail: data.customerEmail,
    customerPhone: data.customerPhone,
    items: verifiedItems,
    subtotal,
    discount,
    deliveryCharge,
    total,
    shippingAddress: data.shippingAddress,
    paymentMethod: data.paymentMethod,
    paymentStatus: data.paymentMethod === "UPI" ? "Paid" : "Pending",
    orderStatus: "Placed",
    notes: data.notes,
  });

  return JSON.parse(JSON.stringify(newOrder)) as IOrder;
}

export async function getOrderByNumber(orderNumber: string): Promise<IOrder | null> {
  await connectToDatabase();
  const order = await Order.findOne({ orderNumber }).lean();
  if (!order) return null;
  return JSON.parse(JSON.stringify(order)) as IOrder;
}

export async function getUserOrders(userId: string): Promise<IOrder[]> {
  await connectToDatabase();
  const orders = await Order.find({ userId }).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(orders)) as IOrder[];
}

export async function getAllOrders(limit = 50): Promise<IOrder[]> {
  await connectToDatabase();
  const orders = await Order.find().sort({ createdAt: -1 }).limit(limit).lean();
  return JSON.parse(JSON.stringify(orders)) as IOrder[];
}

export async function updateOrderStatus(
  orderId: string,
  status: IOrder["orderStatus"],
  trackingNumber?: string
): Promise<IOrder | null> {
  await connectToDatabase();
  const updateData: Record<string, unknown> = { orderStatus: status };
  if (trackingNumber) updateData.trackingNumber = trackingNumber;

  const order = await Order.findByIdAndUpdate(orderId, updateData, {
    new: true,
  }).lean();
  if (!order) return null;
  return JSON.parse(JSON.stringify(order)) as IOrder;
}
