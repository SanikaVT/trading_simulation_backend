/**
 * Author: Udit Gandhi
 * BannerID: B00889579
 * Email: udit.gandhi@dal.ca
 */
import OrderModel from "../order/order.model";
import Order from "../order/order.interface";

//Contains business logic that interacts with MongoDB using Mongoose.
export default class OrderService {
  private order = OrderModel;

  //Creates an order document inside orders collection
  public async create(order: Order): Promise<Order> {
    try {
      const createdOrder = await this.order.create(order);
      return createdOrder;
    } catch (err) {
      console.log(err);
      throw new Error("Unable to create order." + err);
    }
  }

  //Fetches all the orders from the collection
  public async getOrders(): Promise<Order[]> {
    try {
      const orders = await this.order.find();
      return orders;
    } catch (err) {
      throw new Error("Unable to get orders.");
    }
  }

  //Gets all the stocks for a symbol and user id and then finds the count of the stocks that are in placed state i.e bought difference the executed state i.e. sold.
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
