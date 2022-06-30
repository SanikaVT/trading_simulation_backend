import { Request, Response } from "express";
import Orders, { IOrder } from "../../models/order/order";
export const buyOrder = (req: Request, res: Response) => {
  console.log(req.body);
  res.send(200);
};

export const sellOrder = async (req: Request, res: Response) => {
  console.log(req.body);
  const order = new Orders({
    orderID: 12345,
    symbol: "APPL",
    quantity: 120,
    price: 143.6,
    timestamp: "26/07/2021",
    status: "Placed",
    orderType: "Sell",
  });
  try {
    await order.save();
  } catch (err) {
    console.log(err);
  }

  res.send(201);
};
