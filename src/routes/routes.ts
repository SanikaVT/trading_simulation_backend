import express, { Router, Request, Response } from "express";
import { buyOrder, sellOrder } from "../controllers/order/OrderController";
const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("DTrade app is up.");
});

router.post("/buyorder", buyOrder);
router.post("/sellorder", sellOrder);

module.exports = router;
