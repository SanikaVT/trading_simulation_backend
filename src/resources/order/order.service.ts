/**
 * Author: Udit Gandhi
 */
import OrderModel from "../order/order.model";
import Order from "../order/order.interface";

export default class OrderService {
  private order = OrderModel;

  public async create(order: Order): Promise<Order> {
    try {
      const createdOrder = await this.order.create(order);
      return createdOrder;
    } catch (err) {
      console.log(err);
      throw new Error("Unable to create order." + err);
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

  public async getStockCount(userId: any, symbol: any): Promise<Number> {
    try {
      const orders = await this.order.find({
        userID: userId,
        symbol: symbol,
      });
      const count =
        orders.filter((order) => order.status === "Placed").length -
        orders.filter((order) => order.status === "Executed").length;
      return count;
    } catch (err) {
      throw new Error("Unable to get orders.");
    }
  }
}
