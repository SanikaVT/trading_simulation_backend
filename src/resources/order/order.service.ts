import OrderModel from "../order/order.model";
import Order from "../order/order.interface";

export default class OrderService {
  private order = OrderModel;

  public async create(order: Order): Promise<Order> {
    try {
      const post = await this.order.create(order);
      return post;
    } catch (err) {
      throw new Error("Unable to create post");
    }
  }
}
