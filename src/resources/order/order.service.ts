import OrderModel from "../order/order.model";
import Order from "../order/order.interface";

export default class OrderService {
  private order = OrderModel;

  public async create(order: Order): Promise<Order> {
    try {
      const createdOrder = await this.order.create(order);
      return createdOrder;
    } catch (err) {
      throw new Error("Unable to create order.");
    }
  }

  public async getOrders(): Promise<Order[]> {
    try {
      const orders = await this.order.find();
      return orders;
    } catch (err) {
      throw new Error("Unable to get orders.");
    }
  }
}
